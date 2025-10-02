import request from "supertest";
import app from "../src/app";
import { branchService } from "../src/api/v1/services/branchService";

beforeEach(() => {
  branchService.reset();
});

describe("Branch API Routes", () => {
  describe("POST /api/v1/branches", () => {
    it("should create a branch with valid data", async () => {
      // Arrange
      const branchData = {
        name: "Main Branch",
        address: "123 Main St",
        phone: "123-456-7890",
      };

      // Act
      const res = await request(app).post("/api/v1/branches").send(branchData);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Main Branch");
    });
  });

  describe("GET /api/v1/branches", () => {
    it("should return all branches", async () => {
      // Arrange
      await branchService.create({ name: "One", address: "A", phone: "111" });

      // Act
      const res = await request(app).get("/api/v1/branches");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /api/v1/branches/:id", () => {
    it("should return a branch by id", async () => {
      // Arrange
      const branch = branchService.create({ name: "One", address: "A", phone: "111" });

      // Act
      const res = await request(app).get(`/api/v1/branches/${branch.id}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("One");
    });
  });

  describe("PUT /api/v1/branches/:id", () => {
    it("should update an existing branch", async () => {
      // Arrange
      const branch = branchService.create({ name: "Old", address: "A", phone: "111" });

      // Act
      const res = await request(app).put(`/api/v1/branches/${branch.id}`).send({ name: "New" });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("New");
    });
  });

  describe("DELETE /api/v1/branches/:id", () => {
    it("should delete a branch by id", async () => {
      // Arrange
      const branch = branchService.create({ name: "Delete", address: "A", phone: "111" });

      // Act
      const res = await request(app).delete(`/api/v1/branches/${branch.id}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Branch deleted successfully" });
    });
  });
});
