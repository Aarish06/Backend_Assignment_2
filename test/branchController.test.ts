import { Request, Response } from "express";
import { branchController } from "../src/api/v1/controllers/branchController";

describe("Branch Controller", () => {
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
      branchController.create(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
    });

    it("should create a branch with valid data", () => {
      // Arrange
      req.body = {
        name: "Downtown Branch",
        address: "123 Main St",
        phone: "9876543210",
      };

      // Act
      branchController.create(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Downtown Branch",
          address: "123 Main St",
        })
      );
    });
  });
});
