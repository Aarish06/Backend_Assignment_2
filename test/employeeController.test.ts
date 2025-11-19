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
      req.body = {};
      employeeController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          error: "Missing required fields",
        })
      );
    });

    it("should create an employee with valid data", () => {
      req.body = {
        name: "Alice",
        position: "Manager",
        department: "HR",
        email: "alice@example.com",
        phone: "1234567890",
        branchId: 1,
      };

      employeeController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          message: "Employee created successfully",
          data: expect.objectContaining({
            name: "Alice",
            position: "Manager",
          }),
        })
      );
    });
  });
});
