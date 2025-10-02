import { branchService } from "../src/api/v1/services/branchService";

beforeEach(() => {
  branchService.reset();
});

describe("BranchService", () => {
  it("should create a branch", () => {
    const branch = branchService.create({
      name: "Test Branch",
      address: "123 Test St",
      phone: "111-222-3333",
    });

    expect(branch).toHaveProperty("id");
    expect(branch.name).toBe("Test Branch");
  });

  it("should get all branches", () => {
    branchService.create({ name: "B1", address: "A1", phone: "111" });
    branchService.create({ name: "B2", address: "A2", phone: "222" });

    const branches = branchService.getAll();
    expect(branches.length).toBe(2);
  });

  it("should get branch by id", () => {
    const branch = branchService.create({ name: "B1", address: "A1", phone: "111" });
    const found = branchService.getById(branch.id);

    expect(found).toEqual(branch);
  });

  it("should update a branch", () => {
    const branch = branchService.create({ name: "Old", address: "A", phone: "111" });
    const updated = branchService.update(branch.id, { name: "New" });

    expect(updated?.name).toBe("New");
  });

  it("should delete a branch", () => {
    const branch = branchService.create({ name: "Delete", address: "A", phone: "111" });
    const deleted = branchService.delete(branch.id);

    expect(deleted).toBe(true);
    expect(branchService.getById(branch.id)).toBeUndefined();
  });
});
