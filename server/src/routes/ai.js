import express from 'express';
import ollama from 'ollama';
import { getMockDashboardStats } from '../services/mockDataService.js';
import { wazuhService } from '../services/wazuhService.js';

const router = express.Router();

export async function summarizeDashboard(input = {}, services = {}) {
  const { history } = input || {};
  const {
    wazuh = wazuhService,
    dashboardService = null,
    ollamaClient = ollama,
    logger = console
  } = services || {};

  let stats = { totalAlerts: 0, activeIncidents: 0, riskDistribution: {}, recentIncidents: [], source: 'unknown' };
  let usedSource = 'none';

  try {
    if (dashboardService && typeof dashboardService.getStats === 'function') {
      const dash = await dashboardService.getStats();
      if (dash && (dash.totalAlerts || (dash.recentIncidents && dash.recentIncidents.length))) {
        stats = dash;
        usedSource = 'dashboardService';
      }
    }
  } catch (err) {
    logger.error && logger.error('AI: dashboardService.getStats() failed:', err?.message ?? err);
  }

  if (usedSource === 'none') {
    try {
      const [total, recentAlerts, risk] = await Promise.all([
        wazuh.getTotalAlerts(),
        wazuh.getSecurityAlerts({ size: 50, timeRange: '24h' }),
        wazuh.getRiskDistribution()
      ]);

      if (typeof total === 'number') stats.totalAlerts = total;
      if (Array.isArray(recentAlerts)) stats.recentIncidents = recentAlerts;
      if (risk && Array.isArray(risk.levels)) {
        stats.riskDistribution = risk.levels.reduce((acc, cur) => {
          acc[`Level ${cur.key}`] = cur.doc_count;
          return acc;
        }, {});
      }

      usedSource = 'wazuh';
    } catch (err) {
      logger.error && logger.error('AI: wazuhService fetch failed:', err?.message ?? err);
    }
  }

  let isMock = false;
  if ((!stats.totalAlerts || stats.totalAlerts === 0) && (!stats.activeIncidents || stats.activeIncidents === 0) && (!stats.recentIncidents || stats.recentIncidents.length === 0)) {
    stats = getMockDashboardStats();
    isMock = true;
    usedSource = 'mock';
  }

  const activeInc = stats.activeIncidents || 0;
  let baseSeverity = 'Low';
  if (activeInc >= 1 && activeInc <= 5) baseSeverity = 'Medium';
  else if (activeInc > 5 && activeInc <= 10) baseSeverity = 'High';
  else if (activeInc > 10) baseSeverity = 'Critical';

  const mitreMapping = {
    'lateral movement': 'T1021 - Remote Services',
    'brute force': 'T1110 - Brute Force',
    'privilege escalation': 'T1134 - Access Token Manipulation',
    'data exfiltration': 'T1041 - Exfiltration Over Network',
    'malware': 'T1204 - User Execution',
    'unauthorized access': 'T1078 - Valid Accounts',
    'failed login': 'T1110 - Brute Force',
    'scanning': 'T1046 - Network Service Scanning'
  };

  const detected = new Set();
  (stats.recentIncidents || []).forEach(i => {
    const desc = (i.rule?.description || i.description || '') + '';
    const lower = desc.toLowerCase();
    for (const [k, v] of Object.entries(mitreMapping)) if (lower.includes(k)) detected.add(v);
  });
  const mitreText = detected.size ? Array.from(detected).slice(0, 3).join(', ') : 'None Detected';

  const recentLogs = (stats.recentIncidents || []).slice(0, 5).map(i => {
    const ts = i['@timestamp'] || i.timestamp || '';
    const level = i.rule?.level || i.level || 'N/A';
    const desc = i.rule?.description || i.description || '';
    return `[${ts}] Level ${level}: ${desc}`;
  }).join('\n');

  const contextInfo = `DATA SOURCE: ${isMock ? 'SIMULATED' : usedSource}\nTOTAL ALERTS: ${stats.totalAlerts}\nACTIVE INCIDENTS (Level>=7): ${activeInc}\nRISK LEVELS: ${JSON.stringify(stats.riskDistribution)}\nRECENT LOG ENTRIES:\n${recentLogs}`;

  const systemPrompt = `ROLE: You are an expert SOC Security Auditor.\nGOAL: Provide a concise, actionable security summary.\n\nDATA CONTEXT:\n${contextInfo}`;
  const messages = [
    { role: 'system', content: 'You are a robotic SOC reporting tool. Output ONLY the report. No chat.' },
    { role: 'user', content: systemPrompt }
  ];
  if (history && history.length > 0) messages.splice(1, 0, ...history.slice(-2));

  let finalSummary;
  try {
    const resp = await ollamaClient.chat({ model: 'qwen2.5:1.5b', messages, stream: false, options: { temperature: 0.1 } });
    finalSummary = resp?.message?.content?.trim();
    if (!finalSummary) throw new Error('Empty model response');
  } catch (err) {
    const title = '[SECURITY STATUS]:';
    const s1 = activeInc > 0 ? `There are ${stats.totalAlerts} total alerts and ${activeInc} active incident(s) detected.` : `No recent high-severity incidents detected in the last 24 hours.`;
    const s2 = activeInc > 0 ? `The current posture is ${baseSeverity} based on recent alert levels.` : `The system appears stable based on available logs; continue monitoring.`;
    finalSummary = `${title}\n${s1} ${s2}\n\n- Severity: ${baseSeverity}\n- Incidents: ${activeInc}\n- MITRE: ${mitreText}\n- Action: Review recent alerts.\n- Action: Verify monitoring.`;
  }

  return { summary: finalSummary, isMock, source: usedSource };
}

router.post('/summarize-dashboard', async (req, res) => {
  try {
    const result = await summarizeDashboard(req.body, { wazuh: wazuhService, ollamaClient: ollama, logger: console });
    res.json(result);
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).json({ error: 'Ollama connection failed', details: err?.message || String(err) });
  }
});

export default router;
