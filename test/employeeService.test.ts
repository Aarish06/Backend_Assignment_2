import request from "supertest";
import app from "../src/app";
import { employeeService } from "../src/api/v1/services/employeeService";

beforeEach(() => {
  employeeService.reset();
});

describe("Employee API", () => {
  describe("POST /api/v1/employees", () => {
    it("should create a new employee with valid data", async () => {
      const employeeData = {
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      };

      const res = await request(app).post("/api/v1/employees").send(employeeData);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.name).toBe("Alice Johnson");
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should return all employees as an array", async () => {
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
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should return employee by ID", async () => {
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      const res = await request(app).get(`/api/v1/employees/${created.body.data.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Alice Johnson");
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should update an existing employee", async () => {
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      const res = await request(app)
        .put(`/api/v1/employees/${created.body.data.id}`)
        .send({ position: "Senior Manager" });

      expect(res.status).toBe(200);
      expect(res.body.data.position).toBe("Senior Manager");
    });

    it("should return 404 if updating non-existent employee", async () => {
      const res = await request(app).put("/api/v1/employees/999").send({
        position: "Updated",
      });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should delete an existing employee", async () => {
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      const res = await request(app).delete(`/api/v1/employees/${created.body.data.id}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("Employee deleted successfully");
    });

    it("should return 404 when deleting non-existent employee", async () => {
      const res = await request(app).delete("/api/v1/employees/999");
      expect(res.status).toBe(404);
      expect(res.body.status).toBe("error");
    });
  });

  describe("GET /api/v1/employees/branch/:branchId", () => {
    it("should return all employees for a branch", async () => {
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
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0]).toHaveProperty("branchId", 1);
    });
  });

  describe("GET /api/v1/employees/department/:department", () => {
    it("should return all employees in a department", async () => {
      await request(app).post("/api/v1/employees").send({
        name: "Charlie",
        position: "Loan Officer",
        department: "Loans",
        email: "charlie@example.com",
        phone: "555-555-5555",
        branchId: 2,
      });
      await request(app).post("/api/v1/employees").send({
        name: "Daisy",
        position: "Loan Clerk",
        department: "Loans",
        email: "daisy@example.com",
        phone: "444-444-4444",
        branchId: 3,
      });

      const res = await request(app).get("/api/v1/employees/department/Loans");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0]).toHaveProperty("department", "Loans");
    });
  });
});
