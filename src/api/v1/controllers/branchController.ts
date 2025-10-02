import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { branchService } from "../services/branchService";

export const branchController = {
  create: (req: Request, res: Response) => {
    const { name, address, phone } = req.body;
    if ([name, address, phone].some(v => !v)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields" });
    }
    const branch = branchService.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(branch);
  },

  getAll: (_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).json(branchService.getAll()),

  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const branch = branchService.getById(id);
    branch
      ? res.status(HTTP_STATUS.OK).json(branch)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const updated = branchService.update(id, req.body);
    updated
      ? res.status(HTTP_STATUS.OK).json(updated)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ID" });
    const success = branchService.delete(id);
    success
      ? res.status(HTTP_STATUS.OK).json({ message: "Branch deleted successfully" })
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  },
};