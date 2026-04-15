// server/scripts/test-misp-connection.js

import { wazuhService } from "../src/services/wazuhService.js";

async function testMispConnection() {
  console.log("Testing MISP data connection to Wazuh...");

  try {
    // Test getMispAlerts
    console.log("Fetching MISP alerts...");
    const alerts = await wazuhService.getMispAlerts({ size: 10, timeRange: "24h" });
    console.log(`✅ Successfully fetched ${alerts.length} MISP alerts`);

    // Check if data is real (not mock)
    const mockAgents = alerts.filter(alert => alert.agent?.name?.startsWith('MOCK_'));
    if (mockAgents.length > 0) {
      console.log(`⚠️  Warning: Found ${mockAgents.length} alerts with mock agent names`);
    } else {
      console.log("✅ No mock data detected - all alerts appear to be from real agents");
    }

    // Show sample data
    if (alerts.length > 0) {
      console.log("Sample alert:");
      console.log(JSON.stringify(alerts[0], null, 2));
    }

    // Test getMispStats
    console.log("Fetching MISP stats...");
    const stats = await wazuhService.getMispStats({ timeRange: "24h" });
    console.log(`✅ Successfully fetched MISP stats: ${stats.totalCount} total alerts`);
    console.log(`   Timeline points: ${stats.timeline.length}`);
    console.log(`   Daily counts: ${stats.dailyCounts.length}`);
    console.log(`   Top IPs: ${stats.topIps.length}`);

    // Check for real data patterns
    if (stats.totalCount > 0) {
      console.log("✅ MISP stats contain real data");
    } else {
      console.log("ℹ️  No MISP alerts found in the last 24 hours - this may be normal");
    }

    console.log("\n🎉 MISP connection test completed successfully!");

  } catch (error) {
    console.error("❌ MISP connection test failed:");
    console.error(`Error: ${error.message}`);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    process.exit(1);
  }
}

// Run the test
testMispConnection();