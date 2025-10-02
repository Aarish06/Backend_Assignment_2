import request from "supertest";
import app from "../src/app";
import { employeeService } from "../src/api/v1/services/employeeService";

beforeEach(() => {
  employeeService.reset();
});

describe("Employee API", () => {
  it("should create a new employee", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Alice Johnson");
  });

  it("should fail to create employee with missing fields", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "Bob",
    });
    expect(res.status).toBe(400);
  });

  it("should get all employees as an array", async () => {
    await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should get employee by ID", async () => {
    const created = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });
    const res = await request(app).get(`/api/v1/employees/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Alice Johnson");
  });

  it("should update employee", async () => {
    const created = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });
    const res = await request(app)
      .put(`/api/v1/employees/${created.body.id}`)
      .send({ position: "Senior Manager" });
    expect(res.status).toBe(200);
    expect(res.body.position).toBe("Senior Manager");
  });

  it("should return 404 if updating non-existent employee", async () => {
    const res = await request(app).put("/api/v1/employees/999").send({
      position: "Updated",
    });
    expect(res.status).toBe(404);
  });

  it("should delete employee", async () => {
    const created = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });
    const res = await request(app).delete(`/api/v1/employees/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Employee deleted successfully" });
  });

  it("should return 404 when deleting non-existent employee", async () => {
    const res = await request(app).delete("/api/v1/employees/999");
    expect(res.status).toBe(404);
  });
  
  it("should get all employees for a branch", async () => {
    await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Management",
      email: "alice@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });
    await request(app).post("/api/v1/employees").send({
      name: "Bob Smith",
      position: "Clerk",
      department: "Customer Service",
      email: "bob@example.com",
      phone: "987-654-3210",
      branchId: 1,
    });

    const res = await request(app).get("/api/v1/employees/branch/1");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("branchId", 1);
  });

  it("should return 400 if branchId param is missing", async () => {
    const res = await request(app).get("/api/v1/employees/branch/");
    expect(res.status).toBe(400);
  });
});
