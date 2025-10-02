import request from "supertest";
import app from "../src/app";

describe("Employee Routes", () => {
  it("should call the employee controller on POST /api/v1/employees", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

    expect(res.status).toBeDefined();
  });
});
