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

async function checkOllama() {
    console.log(`\n${COLORS.bold}1. Checking Ollama Connectivity...${COLORS.reset}`);
    try {
        const res = await axios.get('http://localhost:11434/api/tags', { timeout: 5000 });
        const models = res.data.models || [];
        const qwen = models.find(m => m.name.includes('qwen2.5:1.5b'));

        if (qwen) {
            console.log(`${COLORS.green}✅ Ollama is running and qwen2.5:1.5b is available.${COLORS.reset}`);
        } else {
            console.log(`${COLORS.yellow}⚠️  Ollama is running but qwen2.5:1.5b was not found.${COLORS.reset}`);
            console.log(`   Available models: ${models.map(m => m.name).join(', ')}`);
            console.log(`   Action: Run 'ollama pull qwen2.5:1.5b'`);
        }
    } catch (err) {
        console.log(`${COLORS.red}❌ Ollama is NOT reachable at http://localhost:11434${COLORS.reset}`);
        console.log(`   Error: ${err.message}`);
    }
}

async function checkWazuhIndexer() {
    console.log(`\n${COLORS.bold}2. Checking Wazuh Indexer Connectivity...${COLORS.reset}`);
    const url = process.env.WAZUH_INDEXER_URL || 'https://localhost:9200';
    const user = process.env.WAZUH_INDEXER_USER || 'admin';
    const pass = process.env.WAZUH_INDEXER_PASS || 'admin';

    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const res = await axios.get(`${url}/_cluster/health`, {
            auth: { username: user, password: pass },
            httpsAgent: agent,
            timeout: 5000
        });
        console.log(`${COLORS.green}✅ Wazuh Indexer is reachable.${COLORS.reset}`);
        console.log(`   Status: ${res.data.status}`);
    } catch (err) {
        console.log(`${COLORS.red}❌ Wazuh Indexer is NOT reachable at ${url}${COLORS.reset}`);
        console.log(`   Error: ${err.message}`);
    }
}

async function checkBackendAPI() {
    console.log(`\n${COLORS.bold}3. Checking Backend API Connectivity...${COLORS.reset}`);
    const port = process.env.PORT || 5001;
    const urls = [
        `http://127.0.0.1:${port}/api/courses`,
        `http://127.0.0.1:${port}/api/wazuh/metrics`,
        `http://127.0.0.1:${port}/api/wazuh/logs`
    ];

    for (const url of urls) {
        try {
            const res = await axios.get(url, { timeout: 3000 });
            console.log(`${COLORS.green}✅ Backend API [${url.split('/').pop()}] is reachable.${COLORS.reset}`);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log(`${COLORS.red}❌ Backend API [${url.split('/').pop()}] returned 404.${COLORS.reset}`);
            } else {
                console.log(`${COLORS.red}❌ Backend API [${url.split('/').pop()}] is NOT reachable.${COLORS.reset}`);
                console.log(`   Error: ${err.message}`);
            }
        }
    }
}

async function runDebug() {
    console.log(`${COLORS.cyan}${COLORS.bold}=== AI Security Assistant Debug Tool ===${COLORS.reset}`);
    await checkOllama();
    await checkWazuhIndexer();
    await checkBackendAPI();
    console.log(`\n${COLORS.cyan}${COLORS.bold}=== Debug Complete ===${COLORS.reset}\n`);
}

runDebug();
