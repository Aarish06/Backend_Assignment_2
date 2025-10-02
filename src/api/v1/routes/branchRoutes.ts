import { Router } from "express";
import { branchController } from "../controllers/branchController";

const router = Router();

router.post("/", branchController.create);
router.get("/", branchController.getAll);
router.get("/:id", branchController.getById);
router.put("/:id", branchController.update);
router.delete("/:id", branchController.delete);

export default router;