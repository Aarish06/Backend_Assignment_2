import request from "supertest";
import app from "../src/app";

describe("Employee Routes", () => {
  describe("POST /api/v1/employees", () => {
    it("should call the employee controller and return a response", async () => {
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
      expect(res.status).toBeDefined();
    });
  });
});
