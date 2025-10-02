import { Employee } from "../models/employeeModel";
import { employees as seedEmployees } from "../../../data/employees";

let employees: Employee[] = [...seedEmployees];
let currentId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;

export const employeeService = {
  create: (data: Omit<Employee, "id">): Employee => {
    const employee = { id: currentId++, ...data };
    employees.push(employee);
    return employee;
  },

  getAll: (): Employee[] => employees,

  getById: (id: number): Employee | undefined =>
    employees.find(e => e.id === id),

  update: (id: number, data: Partial<Employee>): Employee | null => {
    const employee = employees.find(e => e.id === id);
    if (!employee) return null;
    Object.assign(employee, data);
    return employee;
  },

  delete: (id: number): boolean => {
    const index = employees.findIndex(e => e.id === id);
    if (index < 0) return false;
    employees.splice(index, 1);
    return true;
  },

  reset: (): void => {
    employees = [];
    currentId = 1;
  },

};
