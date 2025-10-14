import { employeeSchemas } from "../src/api/v1/validation/employeeValidation";

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