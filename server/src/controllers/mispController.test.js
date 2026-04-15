import { jest } from "@jest/globals";
import { fetchMispAlerts, fetchMispStats } from "./mispController.js";
import { wazuhService } from "../services/wazuhService.js";
import { logger } from "../config/logger.js";

// Spy variables for wazuhService
let getMispAlertsSpy;
let getMispStatsSpy;
let loggerErrorSpy;

describe("mispController", () => {
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

    getMispAlertsSpy = jest.spyOn(wazuhService, "getMispAlerts");
    getMispStatsSpy = jest.spyOn(wazuhService, "getMispStats");
    loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe("fetchMispAlerts", () => {
    it("should return MISP alerts successfully with default parameters", async () => {
      const mockAlerts = [
        {
          "@timestamp": "2024-01-01T00:00:00Z",
          full_log: "srcip=192.168.1.1 result=positive",
          agent: { name: "agent1", id: "001" },
          rule: { id: "100550", level: 10, description: "MISP alert", groups: ["localmisp"] },
          manager: { name: "manager1" },
          location: "file.log"
        }
      ];
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispAlerts(mockReq, mockRes, mockNext);

      expect(getMispAlertsSpy).toHaveBeenCalledWith({
        timeRange: "7d",
        size: 200,
        from: 0,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.alerts).toHaveLength(1);
      expect(responseData.alerts[0]).toMatchObject({
        timestamp: "2024-01-01T00:00:00Z",
        srcip: "192.168.1.1",
        result: "positive",
        agentName: "agent1",
        agentId: "001",
        ruleId: "100550",
        ruleLevel: 10,
        ruleDescription: "MISP alert",
        ruleGroups: ["localmisp"],
        fullLog: "srcip=192.168.1.1 result=positive",
        managerName: "manager1",
        location: "file.log",
      });
      expect(responseData.total).toBe(1);
    });

    it("should handle custom query parameters", async () => {
      mockReq.query = { timeRange: "24h", size: "100", from: "50" };
      const mockAlerts = [];
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispAlerts(mockReq, mockRes, mockNext);

      expect(getMispAlertsSpy).toHaveBeenCalledWith({
        timeRange: "24h",
        size: 100,
        from: 50,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ alerts: [], total: 0 });
    });

    it("should handle service errors gracefully", async () => {
      const error = new Error("Connection failed");
      getMispAlertsSpy.mockRejectedValueOnce(error);

      await fetchMispAlerts(mockReq, mockRes, mockNext);

      expect(loggerErrorSpy).toHaveBeenCalledWith("Failed to fetch MISP alerts: Connection failed");
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch MISP alerts",
        alerts: [],
        total: 0
      });
    });

    it("should parse alerts correctly when full_log has no matches", async () => {
      const mockAlerts = [
        {
          "@timestamp": "2024-01-01T00:00:00Z",
          full_log: "some other log data",
          agent: { name: "agent1", id: "001" },
          rule: { id: "100550", level: 10, description: "MISP alert", groups: ["localmisp"] },
          manager: { name: "manager1" },
          location: "file.log"
        }
      ];
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispAlerts(mockReq, mockRes, mockNext);

      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.alerts[0]).toMatchObject({
        srcip: "N/A",
        result: "N/A",
      });
    });

    it("should ensure data is not mock (agent names do not start with MOCK_)", async () => {
      const mockAlerts = [
        {
          "@timestamp": "2024-01-01T00:00:00Z",
          full_log: "srcip=192.168.1.1 result=positive",
          agent: { name: "real-agent", id: "001" },
          rule: { id: "100550", level: 10, description: "MISP alert", groups: ["localmisp"] },
          manager: { name: "manager1" },
          location: "file.log"
        }
      ];
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispAlerts(mockReq, mockRes, mockNext);

      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.alerts[0].agentName).not.toMatch(/^MOCK_/);
    });
  });

  describe("fetchMispStats", () => {
    it("should return MISP stats successfully with default parameters", async () => {
      const mockStats = {
        timeline: [{ time: "2024-01-01T00:00:00Z", count: 5 }],
        dailyCounts: [{ date: "2024-01-01T00:00:00Z", count: 5 }],
        topIps: [{ ip: "192.168.1.1", count: 3 }],
        totalCount: 5
      };
      const mockAlerts = [
        {
          "@timestamp": "2024-01-01T00:00:00Z",
          full_log: "srcip=192.168.1.1 result=positive",
          agent: { name: "agent1", id: "001" }
        }
      ];
      getMispStatsSpy.mockResolvedValueOnce(mockStats);
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispStats(mockReq, mockRes, mockNext);

      expect(getMispStatsSpy).toHaveBeenCalledWith({ timeRange: "7d" });
      expect(getMispAlertsSpy).toHaveBeenCalledWith({ timeRange: "7d", size: 500 });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData).toMatchObject({
        timeline: [{ time: "2024-01-01T00:00:00Z", count: 5 }],
        dailyCounts: [{ date: "2024-01-01T00:00:00Z", count: 5 }],
        topIps: [{ ip: "192.168.1.1", count: 3 }],
        totalCount: 5,
        uniqueIpCount: 1,
        latestTimestamp: "2024-01-01T00:00:00Z",
        alertsPerHour: expect.any(Number)
      });
    });

    it("should handle custom timeRange", async () => {
      mockReq.query = { timeRange: "24h" };
      const mockStats = { timeline: [], dailyCounts: [], topIps: [], totalCount: 0 };
      const mockAlerts = [];
      getMispStatsSpy.mockResolvedValueOnce(mockStats);
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispStats(mockReq, mockRes, mockNext);

      expect(getMispStatsSpy).toHaveBeenCalledWith({ timeRange: "24h" });
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should build topIps from alerts when stats topIps is empty", async () => {
      const mockStats = {
        timeline: [],
        dailyCounts: [],
        topIps: [], // Empty
        totalCount: 2
      };
      const mockAlerts = [
        { full_log: "srcip=192.168.1.1" },
        { full_log: "srcip=192.168.1.1" },
        { full_log: "srcip=192.168.1.2" }
      ];
      getMispStatsSpy.mockResolvedValueOnce(mockStats);
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispStats(mockReq, mockRes, mockNext);

      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.topIps).toEqual([
        { ip: "192.168.1.1", count: 2 },
        { ip: "192.168.1.2", count: 1 }
      ]);
    });

    it("should handle service errors gracefully", async () => {
      const error = new Error("Stats fetch failed");
      getMispStatsSpy.mockRejectedValueOnce(error);

      await fetchMispStats(mockReq, mockRes, mockNext);

      expect(loggerErrorSpy).toHaveBeenCalledWith("Failed to fetch MISP stats: Stats fetch failed");
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch MISP stats",
        timeline: [],
        dailyCounts: [],
        topIps: [],
        totalCount: 0,
        uniqueIpCount: 0,
        latestTimestamp: null,
        alertsPerHour: 0,
      });
    });

    it("should calculate alertsPerHour correctly for 7d", async () => {
      const mockStats = { timeline: [], dailyCounts: [], topIps: [], totalCount: 168 }; // 1 alert per hour
      const mockAlerts = [];
      getMispStatsSpy.mockResolvedValueOnce(mockStats);
      getMispAlertsSpy.mockResolvedValueOnce(mockAlerts);

      await fetchMispStats(mockReq, mockRes, mockNext);

      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.alertsPerHour).toBe(1);
    });
  });
});