// server/src/services/queryClassifier.js
//
// Second stage of the AI pipeline (after promptFilter).
// Decides which model tier to use based on:
//   - keywords in the user prompt (MITRE, MISP, forensics, etc.)
//   - severity of the current Wazuh context (active incident count)

// Queries containing these terms require the large model's deeper reasoning
const LARGE_MODEL_TRIGGERS = [
    'mitre',
    'att&ck',
    'attack framework',
    'kill chain',
    'misp',
    'ioc',
    'indicator of compromise',
    'threat actor',
    'attribution',
    'lateral movement correlation',
    'forensic',
    'timeline analysis',
    'incident correlation',
    'advanced persistent threat',
    'apt',
    'zero day',
    'zero-day',
    'rootkit',
    'exfiltration path',
    'privilege escalation chain',
    'full report',
    'comprehensive analysis',
    'deep analysis',
    'detailed breakdown',
    'compare techniques',
    'multi-stage attack',
];

// Severity threshold: Critical (>10 incidents) always deserves the large model
const CRITICAL_INCIDENT_THRESHOLD = 10;

/**
 * Classify a prompt + security context into a model tier.
 *
 * @param {string} prompt - The user's raw prompt
 * @param {{ activeIncidents?: number }} context - Live Wazuh context
 * @returns {'small' | 'large'}
 */
export function classifyQuery(prompt, context = {}) {
    const lower = (prompt || '').toLowerCase();
    const { activeIncidents = 0 } = context;

    // Critical severity → always use large model
    if (activeIncidents > CRITICAL_INCIDENT_THRESHOLD) {
        return 'large';
    }

    // Check for deep-analysis keywords
    for (const trigger of LARGE_MODEL_TRIGGERS) {
        if (lower.includes(trigger)) {
            return 'large';
        }
    }

    // Everything else: routine summary / status → small model
    return 'small';
}
