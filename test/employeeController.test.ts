import { Request, Response } from "express";
import { employeeController } from "../src/api/v1/controllers/employeeController";

describe("Employee Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("create", () => {
    it("should return 400 if required fields are missing", () => {
      // Arrange
      req.body = {};

      // Act
      employeeController.create(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
    });

    it("should create an employee with valid data", () => {
      // Arrange
      req.body = {
        name: "Alice",
        position: "Manager",
        department: "HR",
        email: "alice@example.com",
        phone: "1234567890",
        branchId: 1,
      };

      // Act
      employeeController.create(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Alice",
          position: "Manager",
        })
      );
    });
  });
});
