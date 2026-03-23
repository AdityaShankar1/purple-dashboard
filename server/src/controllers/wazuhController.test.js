import { jest } from "@jest/globals";
import { getComplianceData } from "./wazuhController.js";
import { wazuhService } from "../services/wazuhService.js";
import { logger } from "../config/logger.js";

// Mock dependencies using spyOn for ESM compatibility
const wazuhServiceSpy = jest.spyOn(wazuhService, "getCompliance");
const loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => {});

describe("wazuhController - getComplianceData", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it("should return compliance data successfully when API responds correctly", async () => {
    const mockData = {
      auditChart: [{ time: "12:00", volume: 10 }],
      policyViolations: [{ description: "Test violation" }],
    };

    wazuhServiceSpy.mockResolvedValueOnce(mockData);

    await getComplianceData(mockReq, mockRes, mockNext);

    expect(wazuhServiceSpy).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
    expect(loggerErrorSpy).not.toHaveBeenCalled();
  });

  it("should handle missing data fields gracefully", async () => {
    wazuhServiceSpy.mockResolvedValueOnce({});

    await getComplianceData(mockReq, mockRes, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      auditChart: [],
      policyViolations: [],
    });
  });

  it("should log the error and return 500 when API call fails", async () => {
    const mockError = new Error("Network Error");
    mockError.stack = "Error: Network Error at something";
    mockError.response = {
      status: 404,
      data: "Not Found",
    };

    wazuhServiceSpy.mockRejectedValueOnce(mockError);

    await getComplianceData(mockReq, mockRes, mockNext);

    expect(loggerErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Compliance fetch error: Network Error"));
    expect(loggerErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Compliance API Response Status: 404"));
    expect(loggerErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Stack trace: Error: Network Error"));
    
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Failed to fetch compliance data",
      auditChart: [],
      policyViolations: [],
    });
  });
});
