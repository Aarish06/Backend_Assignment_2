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

  it("should return 400 if required fields are missing on create", () => {
    req.body = {};
    branchController.create(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should create a branch with valid data", () => {
    req.body = {
      name: "Downtown Branch",
      address: "123 Main St",
      phone: "9876543210",
    };

    branchController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Downtown Branch",
        address: "123 Main St",
      })
    );
  });
});
