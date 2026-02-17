/**
 * Mock Data Service for Security Dashboard
 * 
 * This service generates realistic mock security data (alerts, incidents, risk distribution)
 * to be used when live data sources (e.g., Wazuh) are unavailable.
 * It simulates a typical SOC environment with various alert levels and incident types.
 */

/**
 * Generates a mock dashboard statistics object.
 * @returns {Object} Mock security stats including alerts, incidents, and recent logs.
 */
export const getMockDashboardStats = () => {
    // Use consistent mock data based on current hour to avoid extreme variance
    // This ensures the same threat level for multiple queries within the same hour
    const hour = new Date().getHours();
    const seed = hour % 2; // Alternate between two stable scenarios
    
    // Scenario A: Moderate threat level (60% of the time)
    if (seed === 0) {
        return {
            source: "Mock Security Data Engine",
            totalAlerts: 145,
            activeIncidents: 3,
            riskDistribution: {
                critical: 14,
                high: 36,
                medium: 58,
                low: 37
            },
            recentIncidents: [
                {
                    level: 9,
                    description: "Lateral movement attempt detected via SMB",
                    agent: "Finance-Server-01",
                    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString()
                },
                {
                    level: 7,
                    description: "Multiple failed root login attempts",
                    agent: "DB-Cluster-Node-3",
                    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                },
                {
                    level: 5,
                    description: "High network traffic spike detected",
                    agent: "Gateway-Firewall",
                    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString()
                }
            ]
        };
    } 
    // Scenario B: Low threat level (40% of the time)
    else {
        return {
            source: "Mock Security Data Engine",
            totalAlerts: 18,
            activeIncidents: 0,
            riskDistribution: {
                critical: 0,
                high: 2,
                medium: 7,
                low: 9
            },
            recentIncidents: [
                {
                    level: 3,
                    description: "Routine security scan completed successfully",
                    agent: "Security-Scanner-01",
                    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
                }
            ]
        };
    }
};
