import request from "supertest";
import app from "../src/app";
import { branchService } from "../src/api/v1/services/branchService";

beforeEach(() => {
  branchService.reset();
});

describe("Branch API Routes", () => {
  it("POST /api/v1/branches → creates a branch", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Main Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Main Branch");
  });

  it("GET /api/v1/branches → gets all", async () => {
    await branchService.create({ name: "One", address: "A", phone: "111" });

    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("GET /api/v1/branches/:id → gets by id", async () => {
    const branch = branchService.create({ name: "One", address: "A", phone: "111" });

    const res = await request(app).get(`/api/v1/branches/${branch.id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("One");
  });

  it("PUT /api/v1/branches/:id → updates branch", async () => {
    const branch = branchService.create({ name: "Old", address: "A", phone: "111" });

    const res = await request(app).put(`/api/v1/branches/${branch.id}`).send({ name: "New" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("New");
  });

  it("DELETE /api/v1/branches/:id → deletes branch", async () => {
    const branch = branchService.create({ name: "Delete", address: "A", phone: "111" });

    const res = await request(app).delete(`/api/v1/branches/${branch.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Branch deleted successfully" });
  });
});
