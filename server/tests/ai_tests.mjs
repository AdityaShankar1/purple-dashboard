import { summarizeDashboard } from '../src/routes/ai_testable.js';

function assert(condition, message) {
  if (!condition) {
    console.error('❌ Test failed:', message);
    process.exit(1);
  }
}

async function test_dashboard_service_used() {
  const mockDashboard = {
    getStats: async () => ({
      totalAlerts: 10,
      activeIncidents: 1,
      riskDistribution: { high: 1 },
      recentIncidents: [{ level: 7, description: 'failed login', timestamp: new Date().toISOString() }]
    })
  };

  const mockOllama = {
    chat: async () => ({ message: { content: 'DUMMY REPORT FROM DASHBOARD' } })
  };

  const res = await summarizeDashboard({ userPrompt: 'Status' }, { dashboardService: mockDashboard, ollamaClient: mockOllama, logger: console });
  assert(res.summary.includes('DUMMY REPORT FROM DASHBOARD'), 'Should use ollama response when dashboardService provided');
  assert(res.source === 'dashboardService', 'Source should be dashboardService');
  console.log('✅ test_dashboard_service_used');
}

async function test_wazuh_fallback() {
  const failingDashboard = { getStats: async () => { throw new Error('dashboard down'); } };
  const mockWazuh = {
    getTotalAlerts: async () => 42,
    getSecurityAlerts: async () => ([{ rule: { level: 8, description: 'brute force attempt' }, '@timestamp': new Date().toISOString() }]),
    getRiskDistribution: async () => ({ levels: [{ key: 8, doc_count: 1 }] })
  };
  const mockOllama = {
    chat: async () => ({ message: { content: 'DUMMY REPORT FROM WAZUH' } })
  };

  const res = await summarizeDashboard({}, { dashboardService: failingDashboard, wazuh: mockWazuh, ollamaClient: mockOllama, logger: console });
  assert(res.summary.includes('DUMMY REPORT FROM WAZUH'), 'Should use ollama response when wazuh provides data');
  assert(res.source === 'wazuh', 'Source should be wazuh');
  console.log('✅ test_wazuh_fallback');
}

async function test_all_failures_use_mock() {
  const failingDashboard = { getStats: async () => { throw new Error('down'); } };
  const failingWazuh = {
    getTotalAlerts: async () => { throw new Error('wazuh down'); },
    getSecurityAlerts: async () => { throw new Error('wazuh down'); },
    getRiskDistribution: async () => { throw new Error('wazuh down'); }
  };
  const mockOllama = {
    chat: async () => { throw new Error('model missing'); }
  };

  const res = await summarizeDashboard({}, { dashboardService: failingDashboard, wazuh: failingWazuh, ollamaClient: mockOllama, logger: console });
  assert(res.isMock === true, 'Should fallback to mock data');
  assert(res.summary.includes('[SECURITY STATUS]:'), 'Summary should be deterministic fallback');
  console.log('✅ test_all_failures_use_mock');
}

(async () => {
  await test_dashboard_service_used();
  await test_wazuh_fallback();
  await test_all_failures_use_mock();
  console.log('\nAll AI assistant tests passed.');
})();
