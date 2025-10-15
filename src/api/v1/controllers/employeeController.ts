import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  create: async (req: Request, res: Response) => {
    const { name, position, department, email, phone, branchId } = req.body;

    if ([name, position, department, email, phone, branchId].some(v => !v)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Missing required fields" });
    }

    const employee = await employeeService.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json({ status: "success", data: employee });
  },

  getAll: async (_req: Request, res: Response) => {
    const employees = await employeeService.getAll();
    return res.status(HTTP_STATUS.OK).json({ status: "success", data: employees });
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });

    const employee = await employeeService.getById(id);
    return employee
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: employee })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Employee not found" });
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });

    const updated = await employeeService.update(id, req.body);
    return updated
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: updated })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Employee not found" });
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });

    const success = await employeeService.delete(id);
    return success
      ? res
          .status(HTTP_STATUS.OK)
          .json({ status: "success", message: "Employee deleted successfully" })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Employee not found" });
  },

  getByBranchId: async (req: Request, res: Response) => {
    const branchId = Number(req.params.branchId);
    if (!branchId)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid branch ID" });

    const employees = await employeeService.getByBranchId(branchId);
    return res.status(HTTP_STATUS.OK).json({ status: "success", data: employees });
  },

  getByDepartment: async (req: Request, res: Response) => {
    const { department } = req.params;
    if (!department)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Department is required" });

    const employees = await employeeService.getByDepartment(department);
    return res.status(HTTP_STATUS.OK).json({ status: "success", data: employees });
  },
};
