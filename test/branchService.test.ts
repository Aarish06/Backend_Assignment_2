import { branchService } from "../src/api/v1/services/branchService";

beforeEach(() => {
  branchService.reset();
});

describe("BranchService", () => {
  describe("create", () => {
    it("should create a branch with valid data", () => {
      // Arrange
      const data = { name: "Test Branch", address: "123 Test St", phone: "111-222-3333" };

      // Act
      const branch = branchService.create(data);

      // Assert
      expect(branch).toHaveProperty("id");
      expect(branch.name).toBe("Test Branch");
    });
  });

  describe("getAll", () => {
    it("should return all branches", () => {
      // Arrange
      branchService.create({ name: "B1", address: "A1", phone: "111" });
      branchService.create({ name: "B2", address: "A2", phone: "222" });

      // Act
      const branches = branchService.getAll();

      // Assert
      expect(branches.length).toBe(2);
    });
  });

  describe("getById", () => {
    it("should return a branch by id", () => {
      // Arrange
      const branch = branchService.create({ name: "B1", address: "A1", phone: "111" });

      // Act
      const found = branchService.getById(branch.id);

      // Assert
      expect(found).toEqual(branch);
    });
  });

  describe("update", () => {
    it("should update a branch with new values", () => {
      // Arrange
      const branch = branchService.create({ name: "Old", address: "A", phone: "111" });

      // Act
      const updated = branchService.update(branch.id, { name: "New" });

      // Assert
      expect(updated?.name).toBe("New");
    });
  });

  describe("delete", () => {
    it("should delete a branch by id", () => {
      // Arrange
      const branch = branchService.create({ name: "Delete", address: "A", phone: "111" });

      // Act
      const deleted = branchService.delete(branch.id);

      // Assert
      expect(deleted).toBe(true);
      expect(branchService.getById(branch.id)).toBeUndefined();
    });
  });
});
