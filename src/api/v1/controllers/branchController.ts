import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { branchService } from "../services/branchService";

export const branchController = {
  create: (req: Request, res: Response) => {
    const { name, address, phone } = req.body;

    if ([name, address, phone].some(v => !v)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    const branch = branchService.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json(branch);
  },

  getAll: (_req: Request, res: Response) => {
    const branches = branchService.getAll();
    return res.status(HTTP_STATUS.OK).json(branches);
  },

  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid ID" });

    const branch = branchService.getById(id);
    if (!branch)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });

    return res.status(HTTP_STATUS.OK).json(branch);
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid ID" });

    const updated = branchService.update(id, req.body);
    if (!updated)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });

    return res.status(HTTP_STATUS.OK).json(updated);
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid ID" });

    const success = branchService.delete(id);
    if (!success)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Branch deleted successfully" });
  },
};
