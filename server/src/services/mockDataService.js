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
    // Generate some random variation to make it feel slightly dynamic
    const totalAlerts = Math.floor(Math.random() * 50) + 120;
    const activeIncidents = Math.floor(Math.random() * 5) + 2;

    const mockStats = {
        source: "Mock Security Data Engine",
        totalAlerts: totalAlerts,
        activeIncidents: activeIncidents,
        riskDistribution: {
            critical: Math.floor(totalAlerts * 0.1),
            high: Math.floor(totalAlerts * 0.25),
            medium: Math.floor(totalAlerts * 0.4),
            low: Math.floor(totalAlerts * 0.25)
        },
        recentIncidents: [
            {
                level: 12,
                description: "Lateral movement attempt detected via SMB",
                agent: "Finance-Server-01",
                timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
            },
            {
                level: 10,
                description: "Multiple failed root login attempts",
                agent: "DB-Cluster-Node-3",
                timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString()
            },
            {
                level: 8,
                description: "Suspicious PowerShell execution policy bypass",
                agent: "HR-Workstation-04",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
            },
            {
                level: 7,
                description: "Outbound traffic to known malicious IP",
                agent: "Gateway-Firewall",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
            },
            {
                level: 5,
                description: "New user account created with administrative privileges",
                agent: "Domain-Controller-01",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
            }
        ]
    };

    return mockStats;
};
