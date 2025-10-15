import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { branchService } from "../services/branchService";

export const branchController = {
  // CREATE
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, address, phone } = req.body;

      if ([name, address, phone].some((v) => !v)) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "Missing required fields" });
      }

      const branch = await branchService.create(req.body);
      return res.status(HTTP_STATUS.CREATED).json(branch);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create branch" });
    }
  },

  // GET ALL
  getAll: async (_req: Request, res: Response): Promise<Response> => {
    try {
      const branches = await branchService.getAll();
      return res.status(HTTP_STATUS.OK).json(branches);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch branches" });
    }
  },

  // GET BY ID
  getById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "Invalid ID" });

      const branch = await branchService.getById(id);
      if (!branch)
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Branch not found" });

      return res.status(HTTP_STATUS.OK).json(branch);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch branch" });
    }
  },

  // UPDATE
  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "Invalid ID" });

      const updated = await branchService.update(id, req.body);
      if (!updated)
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Branch not found" });

      return res.status(HTTP_STATUS.OK).json(updated);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update branch" });
    }
  },

  // DELETE
  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "Invalid ID" });

      const success = await branchService.delete(id);
      if (!success)
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Branch not found" });

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Branch deleted successfully" });
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete branch" });
    }
  },
};
