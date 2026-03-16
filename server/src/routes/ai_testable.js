import { getMockDashboardStats } from '../services/mockDataService.js';

export async function summarizeDashboard(input = {}, services = {}) {
  const { history } = input || {};
  const {
    wazuh = null,
    dashboardService = null,
    ollamaClient = null,
    logger = console
  } = services || {};

  let stats = null;
  let usedSource = 'none';

  // 1) dashboardService
  try {
    if (dashboardService && typeof dashboardService.getStats === 'function') {
      const dash = await dashboardService.getStats();
      if (dash) {
        stats = dash;
        usedSource = 'dashboardService';
      }
    }
  } catch (e) {
    logger.debug && logger.debug('dashboardService failed:', e?.message ?? e);
  }

  // 2) wazuh
  if (usedSource === 'none' && wazuh) {
    try {
      const [total, recent, risk] = await Promise.all([
        wazuh.getTotalAlerts(),
        wazuh.getSecurityAlerts(),
        wazuh.getRiskDistribution()
      ]);
      stats = { totalAlerts: total, recentIncidents: recent, riskDistribution: risk };
      usedSource = 'wazuh';
    } catch (e) {
      logger.debug && logger.debug('wazuh failed:', e?.message ?? e);
    }
  }

  // 3) fallback mock
  let isMock = false;
  if (!stats) {
    stats = getMockDashboardStats();
    isMock = true;
    usedSource = 'mock';
  }

  // Try Ollama
  try {
    if (ollamaClient && typeof ollamaClient.chat === 'function') {
      const resp = await ollamaClient.chat({ model: 'test-model', messages: [] });
      const content = resp?.message?.content || '';
      return { summary: content, isMock, source: usedSource };
    }
  } catch (e) {
    logger.debug && logger.debug('ollama failed:', e?.message ?? e);
  }

  // deterministic fallback
  const fallback = `[SECURITY STATUS]: Mock fallback summary`;
  return { summary: fallback, isMock, source: usedSource };
}

export default summarizeDashboard;
