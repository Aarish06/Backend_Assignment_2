import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { employeeService } from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";

export const employeeController = {
  create: (req: Request, res: Response) => {
    const { name, position, department, email, phone, branchId } = req.body;

    if ([name, position, department, email, phone, branchId].some(v => !v)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Missing required fields", HTTP_STATUS.BAD_REQUEST));
    }

    const employee = employeeService.create(req.body);
    return res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse(employee, "Employee created successfully"));
  },

  getAll: (_req: Request, res: Response) => {
    const employees = employeeService.getAll();
    return res.status(HTTP_STATUS.OK).json(successResponse(employees, "All employees retrieved"));
  },

  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Invalid ID", HTTP_STATUS.BAD_REQUEST));

    const employee = employeeService.getById(id);
    return employee
      ? res.json(successResponse(employee, "Employee retrieved successfully"))
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(errorResponse(res, "Employee not found", HTTP_STATUS.NOT_FOUND));
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Invalid ID", HTTP_STATUS.BAD_REQUEST));

    const updatedEmployee = employeeService.update(id, req.body);
    return updatedEmployee
      ? res.json(successResponse(updatedEmployee, "Employee updated successfully"))
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(errorResponse(res, "Employee not found", HTTP_STATUS.NOT_FOUND));
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Invalid ID", HTTP_STATUS.BAD_REQUEST));

    const success = employeeService.delete(id);
    return success
      ? res.json(successResponse({}, "Employee deleted successfully"))
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(errorResponse(res, "Employee not found", HTTP_STATUS.NOT_FOUND));
  },

  getByBranchId: (req: Request, res: Response) => {
    const branchId = Number(req.params.branchId);
    if (!branchId)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Invalid branch ID", HTTP_STATUS.BAD_REQUEST));

    const employees = employeeService.getByBranchId(branchId);
    return res.json(successResponse(employees, "Employees by branch retrieved"));
  },

  getByDepartment: (req: Request, res: Response) => {
    const { department } = req.params;
    if (!department)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(res, "Department is required", HTTP_STATUS.BAD_REQUEST));

    const employees = employeeService.getByDepartment(department);
    return res.json(successResponse(employees, "Employees by department retrieved"));
  },
};
