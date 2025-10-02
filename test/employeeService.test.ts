import request from "supertest";
import app from "../src/app";
import { employeeService } from "../src/api/v1/services/employeeService";

beforeEach(() => {
  employeeService.reset();
});

describe("Employee API", () => {
  describe("POST /api/v1/employees", () => {
    it("should create a new employee with valid data", async () => {
      // Arrange
      const employeeData = {
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      };

      // Act
      const res = await request(app).post("/api/v1/employees").send(employeeData);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("Alice Johnson");
    });

    it("should fail to create an employee with missing fields", async () => {
      // Arrange
      const invalidData = { name: "Bob" };

      // Act
      const res = await request(app).post("/api/v1/employees").send(invalidData);

      // Assert
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should return all employees as an array", async () => {
      // Arrange
      await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      // Act
      const res = await request(app).get("/api/v1/employees");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should return employee by ID", async () => {
      // Arrange
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      // Act
      const res = await request(app).get(`/api/v1/employees/${created.body.id}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Alice Johnson");
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should update an existing employee", async () => {
      // Arrange
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      // Act
      const res = await request(app)
        .put(`/api/v1/employees/${created.body.id}`)
        .send({ position: "Senior Manager" });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.position).toBe("Senior Manager");
    });

    it("should return 404 if updating non-existent employee", async () => {
      // Arrange & Act
      const res = await request(app).put("/api/v1/employees/999").send({
        position: "Updated",
      });

      // Assert
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should delete an existing employee", async () => {
      // Arrange
      const created = await request(app).post("/api/v1/employees").send({
        name: "Alice Johnson",
        position: "Manager",
        department: "Management",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: 1,
      });

      // Act
      const res = await request(app).delete(`/api/v1/employees/${created.body.id}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Employee deleted successfully" });
    });

    it("should return 404 when deleting non-existent employee", async () => {
      // Arrange & Act
      const res = await request(app).delete("/api/v1/employees/999");

      // Assert
      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/v1/employees/branch/:branchId", () => {
    it("should return all employees for a branch", async () => {
      // Arrange
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

      // Act
      const res = await request(app).get("/api/v1/employees/branch/1");

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty("branchId", 1);
    });

    it("should return 400 if branchId param is missing", async () => {
      // Arrange & Act
      const res = await request(app).get("/api/v1/employees/branch/");

      // Assert
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/employees/department/:department", () => {
    it("should return all employees in a department", async () => {
      // Arrange
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

      // Act
      const res = await request(app).get("/api/v1/employees/department/Loans");

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty("department", "Loans");
    });

    it("should return 400 if department param is missing", async () => {
      // Arrange & Act
      const res = await request(app).get("/api/v1/employees/department/");

      // Assert
      expect(res.status).toBe(400);
    });
  });
});
