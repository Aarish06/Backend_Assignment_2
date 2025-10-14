import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/branchValidation";
import { branchController } from "../controllers/branchController";

const router: Router = express.Router();

router.get("/", branchController.getAll);
router.post("/", validateRequest(branchSchemas.create),branchController.create);
router.get("/:id", validateRequest(branchSchemas.getById),branchController.getById);
router.put("/:id",validateRequest(branchSchemas.update),branchController.update);
router.delete("/:id",validateRequest(branchSchemas.delete),branchController.delete);

export default router;
