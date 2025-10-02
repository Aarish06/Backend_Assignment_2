import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  create: (req: Request, res: Response) => {
    const { name, position, department, email, phone, branchId } = req.body;
    if ([name, position, department, email, phone, branchId].some(v => !v)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields" });
    }
    const employee = employeeService.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(employee);
  },

  getAll: (_req: Request, res: Response) => {
    res.json(employeeService.getAll());
  },

  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const employee = employeeService.getById(id);
    employee
      ? res.json(employee)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const employee = employeeService.update(id, req.body);
    employee
      ? res.json(employee)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const success = employeeService.delete(id);
    success
      ? res.json({ message: "Employee deleted successfully" })
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  },
  getByBranchId: (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  return branchId
    ? res.json(employeeService.getByBranchId(branchId))
    : res.status(400).json({ error: "Invalid branch ID" });
},

 getByDepartment: (req: Request, res: Response) => {
  const { department } = req.params;
  return department
    ? res.json(employeeService.getByDepartment(department))
    : res.status(400).json({ error: "Department is required" });
},
};
