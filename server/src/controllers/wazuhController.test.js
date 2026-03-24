import { jest } from "@jest/globals";
import {
  getComplianceData,
  fetchAlertsCount,
  fetchMetrics,
  fetchIncidents,
  fetchThreatIntel,
  fetchNetworking
} from "./wazuhController.js";
import { wazuhService } from "../services/wazuhService.js";
import { logger } from "../config/logger.js";

// Spies for wazuhService
const getTotalAlertsSpy = jest.spyOn(wazuhService, "getTotalAlerts");
const getSecurityAlertsSpy = jest.spyOn(wazuhService, "getSecurityAlerts");
const getNetworkingDataSpy = jest.spyOn(wazuhService, "getNetworkingData");
const getComplianceSpy = jest.spyOn(wazuhService, "getCompliance");

// Spy for logger
const loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => { });

describe("wazuhController", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      query: {},
      params: {},
    };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe("fetchAlertsCount", () => {
    it("should return count successfully", async () => {
      mockReq.query.timeRange = "24h";
      getTotalAlertsSpy.mockResolvedValueOnce(42);

      await fetchAlertsCount(mockReq, mockRes, mockNext);

      expect(getTotalAlertsSpy).toHaveBeenCalledWith("24h");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ count: 42 });
    });

    it("should call next with error on failure", async () => {
      getTotalAlertsSpy.mockRejectedValueOnce(new Error("Fail"));

      await fetchAlertsCount(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe("fetchMetrics", () => {
    it("should return total count, alerts and last24hCount", async () => {
      getTotalAlertsSpy.mockResolvedValueOnce(100).mockResolvedValueOnce(10);
      getSecurityAlertsSpy.mockResolvedValueOnce([{ id: 1 }]);

      await fetchMetrics(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        count: 100,
        alerts: [{ id: 1 }],
        last24hCount: 10,
      });
    });
  });

  describe("fetchIncidents", () => {
    it("should return alerts with level 7 and 1h range", async () => {
      getSecurityAlertsSpy.mockResolvedValueOnce([{ level: 7 }]);

      await fetchIncidents(mockReq, mockRes, mockNext);

      expect(getSecurityAlertsSpy).toHaveBeenCalledWith({ level: 7, timeRange: "1h" });
      expect(mockRes.json).toHaveBeenCalledWith({ incidents: [{ level: 7 }] });
    });
  });

  describe("fetchThreatIntel", () => {
    it("should process and return marker, actor, asset and severity data", async () => {
      const mockAlerts = [
        {
          agent: { geo: { latitude: 10, longitude: 20, country_name: "USA" } },
          rule: { mitre: { tactic: ["Initial Access"] }, groups: ["vulnerability-detector"], description: "Vuln" }
        }
      ];
      // 90d query
      getSecurityAlertsSpy.mockResolvedValueOnce(mockAlerts);
      // 24h query for severity
      getSecurityAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchThreatIntel(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      const response = mockRes.json.mock.calls[0][0];
      expect(response.global).toHaveLength(1);
      expect(response.actors).toHaveLength(1);
      expect(response.assets).toHaveLength(1);
      expect(response.incidentSeverity).toBeDefined();
    });
  });

  describe("fetchNetworking", () => {
    it("should return traffic, firewall and malware data", async () => {
      const mockFlows = [{
        "@timestamp": "2023-01-01T00:00:00Z",
        data: { flow: { bytes_toclient: 100, bytes_toserver: 50 }, proto: "TCP" },
        rule: { groups: ["malware"], description: "Malicious" },
        agent: { name: "agent1" }
      }];
      getNetworkingDataSpy.mockResolvedValueOnce(mockFlows);

      await fetchNetworking(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      const response = mockRes.json.mock.calls[0][0];
      expect(response.traffic).toHaveLength(1);
      expect(response.firewall).toHaveLength(1);
      expect(response.malware).toHaveLength(1);
    });
  });

  describe("getComplianceData", () => {
    it("should return compliance data successfully", async () => {
      const mockData = {
        auditChart: [{ time: "12:00", volume: 10 }],
        policyViolations: [{ description: "Test" }],
      };
      getComplianceSpy.mockResolvedValueOnce(mockData);

      await getComplianceData(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it("should log error and return 500 on failure", async () => {
      getComplianceSpy.mockRejectedValueOnce(new Error("Connect Fail"));

      await getComplianceData(mockReq, mockRes, mockNext);

      expect(loggerErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Failed to fetch compliance data: Connect Fail"));
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});
