import request from "supertest";
import app from "../src/app";

describe("Health Routes", () => {
  describe("GET /health", () => {
    it("should return 200 OK with health status message", async () => {
      // Arrange
      const endpoint = "/health";

      // Act
      const response = await request(app).get(endpoint);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.text).toBe("Server is healthy");
    });
  });
});
