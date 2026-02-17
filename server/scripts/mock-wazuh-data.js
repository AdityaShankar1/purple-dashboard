import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import https from 'https';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const COLORS = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m"
};

const MOCK_ALERTS = [
    {
        "@timestamp": new Date().toISOString(),
        "rule": {
            "level": 12,
            "description": "Multiple failed login attempts followed by a successful login from a new IP",
            "groups": ["authentication_failed", "authentication_success"]
        },
        "agent": { "name": "web-server-01", "id": "001" },
        "data": { "srcip": "192.168.1.100", "user": "admin" }
    },
    {
        "@timestamp": new Date(Date.now() - 3600000).toISOString(),
        "rule": {
            "level": 10,
            "description": "Shellshock attack attempt detected",
            "groups": ["web", "attack"]
        },
        "agent": { "name": "api-gateway", "id": "002" },
        "data": { "srcip": "45.76.x.x" }
    },
    {
        "@timestamp": new Date(Date.now() - 7200000).toISOString(),
        "rule": {
            "level": 5,
            "description": "User created in the system",
            "groups": ["syslog", "user_added"]
        },
        "agent": { "name": "db-server", "id": "003" },
        "data": { "dstuser": "john_doe" }
    }
];

async function injectMockData() {
    console.log(`${COLORS.cyan}${COLORS.bold}=== Wazuh Mock Data Injector ===${COLORS.reset}`);
    const url = process.env.WAZUH_INDEXER_URL || 'https://localhost:9200';
    const index = 'wazuh-alerts-mock-' + new Date().toISOString().split('T')[0].replace(/-/g, '.');
    const user = process.env.WAZUH_INDEXER_USER || 'admin';
    const pass = process.env.WAZUH_INDEXER_PASS || 'admin';

    const agent = new https.Agent({ rejectUnauthorized: false });

    try {
        console.log(`\n${COLORS.bold}Injecting alerts into ${index}...${COLORS.reset}`);

        for (const alert of MOCK_ALERTS) {
            await axios.post(`${url}/${index}/_doc`, alert, {
                auth: { username: user, password: pass },
                httpsAgent: agent
            });
        }

        console.log(`${COLORS.green}✅ Successfully injected ${MOCK_ALERTS.length} mock alerts.${COLORS.reset}`);
        console.log(`\n${COLORS.yellow}Note: To make these visible in the dashboard, ensure your WAZUH_INDEX_PATTERN env variable includes 'wazuh-alerts-mock-*' or simply 'wazuh-alerts-*'.${COLORS.reset}`);

    } catch (err) {
        console.log(`${COLORS.red}❌ Failed to inject mock data.${COLORS.reset}`);
        console.log(`   Error: ${err.message}`);
        if (err.response) {
            console.log(`   Response: ${JSON.stringify(err.response.data)}`);
        }
    }
}

injectMockData();
