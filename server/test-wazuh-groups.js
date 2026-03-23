// Diagnostic script: inspect what real Wazuh alerts look like
// and find what rule.groups are present in the actual data
import axios from "axios";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const {
  WAZUH_INDEXER_URL = "https://192.168.31.21:9200",
  WAZUH_INDEXER_USER = "admin",
  WAZUH_INDEXER_PASS = "admin",
  WAZUH_INDEX_PATTERN = "wazuh-alerts-*",
} = process.env;

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const auth = { username: WAZUH_INDEXER_USER, password: WAZUH_INDEXER_PASS };

async function inspect() {
  try {
    // 1. Get total count of documents
    const countRes = await axios.get(
      `${WAZUH_INDEXER_URL}/${WAZUH_INDEX_PATTERN}/_count`,
      { httpsAgent, auth }
    );
    console.log("Total alerts in Wazuh index:", countRes.data.count);

    // 2. Get a sample of 5 recent alerts to inspect their structure
    const sampleRes = await axios.post(
      `${WAZUH_INDEXER_URL}/${WAZUH_INDEX_PATTERN}/_search`,
      {
        size: 5,
        sort: [{ "@timestamp": { order: "desc" } }],
        _source: ["@timestamp", "rule.groups", "rule.description", "rule.level"],
      },
      { httpsAgent, auth, headers: { "Content-Type": "application/json" } }
    );
    const hits = sampleRes.data.hits?.hits || [];
    console.log("\n--- Sample Alerts (most recent) ---");
    hits.forEach((h, i) => {
      console.log(`\n[${i + 1}]`, JSON.stringify(h._source, null, 2));
    });

    // 3. Get all distinct rule.groups using aggregation
    const aggRes = await axios.post(
      `${WAZUH_INDEXER_URL}/${WAZUH_INDEX_PATTERN}/_search`,
      {
        size: 0,
        aggs: {
          all_groups: { terms: { field: "rule.groups", size: 50 } }
        }
      },
      { httpsAgent, auth, headers: { "Content-Type": "application/json" } }
    );
    const buckets = aggRes.data.aggregations?.all_groups?.buckets || [];
    console.log("\n--- All distinct rule.groups ---");
    buckets.forEach(b => console.log(` - "${b.key}": ${b.doc_count} alerts`));

  } catch (err) {
    console.error("Error:", err.message);
    if (err.response) console.error("Response:", JSON.stringify(err.response.data, null, 2));
  }
}

inspect();
