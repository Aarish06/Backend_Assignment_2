import { Employee } from "../models/employeeModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "employees";

export const employeeService = {
  // Create a new employee
  create: async (data: Omit<Employee, "id">): Promise<Employee> => {
    const allEmployees = await getDocuments(COLLECTION);
    const newId =
      allEmployees.docs.length > 0
        ? Math.max(...allEmployees.docs.map((d) => d.data().id || 0)) + 1
        : 1;

    const employee: Employee = { id: newId, ...data };
    await createDocument<Employee>(COLLECTION, employee);
    return employee;
  },

  // Get all employees
  getAll: async (): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => doc.data() as Employee);
  },

  // Get employee by ID (numeric)
 getById: async (id: number): Promise<Employee | null> => {
  const snapshot = await getDocuments(COLLECTION);
  const employees = snapshot.docs.map((doc) => doc.data() as Employee);
  const match = employees.find((e) => e.id === id);
  return match || null;
},


  // Update employee by ID
  update: async (id: number, data: Partial<Employee>): Promise<Employee | null> => {
    const snapshot = await getDocuments(COLLECTION);
    const doc = snapshot.docs.find((d) => (d.data() as Employee).id === id);
    if (!doc) return null;

    await updateDocument<Employee>(COLLECTION, doc.id, data);
    return { ...(doc.data() as Employee), ...data };
  },

  // Delete employee by ID
  delete: async (id: number): Promise<boolean> => {
    const snapshot = await getDocuments(COLLECTION);
    const doc = snapshot.docs.find((d) => (d.data() as Employee).id === id);
    if (!doc) return false;

    await deleteDocument(COLLECTION, doc.id);
    return true;
  },

  // Get employees by branchId (numeric)
  getByBranchId: async (branchId: number): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs
      .map((doc) => doc.data() as Employee)
      .filter((e) => e.branchId === branchId);
  },

  // Get employees by department
  getByDepartment: async (department: string): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs
      .map((doc) => doc.data() as Employee)
      .filter(
        (e) => e.department?.toLowerCase() === department.toLowerCase()
      );
  },
};
