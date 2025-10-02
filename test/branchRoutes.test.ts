import request from "supertest";
import app from "../src/app";
import { branchService } from "../src/api/v1/services/branchService";

beforeEach(() => {
  branchService.reset();
});

describe("Branch API", () => {
  // CREATE
  it("should create a new branch", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Main Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Main Branch");
  });

  it("should fail to create branch with missing fields", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Missing Address",
    });
    expect(res.status).toBe(400);
  });

  // GET ALL
  it("should get all branches", async () => {
    await request(app).post("/api/v1/branches").send({
      name: "Main Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  // GET BY ID
  it("should get branch by ID", async () => {
    const created = await request(app).post("/api/v1/branches").send({
      name: "Main Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    const res = await request(app).get(`/api/v1/branches/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Main Branch");
  });

  it("should fail with invalid branch ID", async () => {
    const res = await request(app).get("/api/v1/branches/abc");
    expect(res.status).toBe(400);
  });

  // UPDATE
  it("should update a branch", async () => {
    const created = await request(app).post("/api/v1/branches").send({
      name: "Old Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    const res = await request(app)
      .put(`/api/v1/branches/${created.body.id}`)
      .send({ address: "456 New St" });
    expect(res.status).toBe(200);
    expect(res.body.address).toBe("456 New St");
  });

  it("should fail to update with invalid ID", async () => {
    const res = await request(app).put("/api/v1/branches/abc").send({ address: "456 New St" });
    expect(res.status).toBe(400);
  });

  // DELETE
  it("should delete a branch", async () => {
    const created = await request(app).post("/api/v1/branches").send({
      name: "Delete Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    const res = await request(app).delete(`/api/v1/branches/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Branch deleted successfully" });
  });

  it("should fail to delete with invalid ID", async () => {
    const res = await request(app).delete("/api/v1/branches/abc");
    expect(res.status).toBe(400);
  });

});
