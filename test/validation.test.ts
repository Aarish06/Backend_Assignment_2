import { employeeSchemas } from "../src/api/v1/validation/employeeValidation";
import { branchSchemas } from "../src/api/v1/validation/branchValidation";

describe("Employee Schemas", () => {
  test("create valid and invalid", () => {
    expect(employeeSchemas.create.body.validate({
      name: "Aarish", position: "Engineer", email: "a@b.com", phone: "+1-204-999-1234", department: "IT", branchId: 1
    }).error).toBeUndefined();

    expect(employeeSchemas.create.body.validate({
      name: "A", position: "", email: "bad", phone: "123", department: "", branchId: "x"
    }).error).toBeDefined();
  });

  test("update valid and invalid", () => {
    expect(employeeSchemas.update.body.validate({ position: "Manager", phone: "2045556789" }).error).toBeUndefined();
    expect(employeeSchemas.update.body.validate({ phone: "Aab" }).error).toBeDefined();
  });

  test("getById", () => {
    expect(employeeSchemas.getById.params.validate({ id: 1 }).error).toBeUndefined();
    expect(employeeSchemas.getById.params.validate({ id: "x" }).error).toBeDefined();
  });

  test("getByBranchId", () => {
    expect(employeeSchemas.getByBranchId.params.validate({ branchId: 2 }).error).toBeUndefined();
    expect(employeeSchemas.getByBranchId.params.validate({ branchId: "x" }).error).toBeDefined();
  });

  test("getByDepartment", () => {
    expect(employeeSchemas.getByDepartment.params.validate({ department: "Finance" }).error).toBeUndefined();
    expect(employeeSchemas.getByDepartment.params.validate({ department: "" }).error).toBeDefined();
  });
});

describe("Branch Schemas", () => {
  test("create valid and invalid", () => {
    expect(branchSchemas.create.body.validate({
      name: "Downtown", address: "123 Main St", phone: "204-555-7890"
    }).error).toBeUndefined();

    expect(branchSchemas.create.body.validate({
      name: "A", address: "", phone: "123"
    }).error).toBeDefined();
  });

  test("update valid and invalid", () => {
    expect(branchSchemas.update.body.validate({ name: "Uptown", phone: "2045551234" }).error).toBeUndefined();
    expect(branchSchemas.update.body.validate({ phone: "abc" }).error).toBeDefined();
  });

  test("getById", () => {
    expect(branchSchemas.getById.params.validate({ id: 10 }).error).toBeUndefined();
    expect(branchSchemas.getById.params.validate({ id: "bad" }).error).toBeDefined();
  });

  test("delete", () => {
    expect(branchSchemas.delete.params.validate({ id: 5 }).error).toBeUndefined();
    expect(branchSchemas.delete.params.validate({ id: null }).error).toBeDefined();
  });
});