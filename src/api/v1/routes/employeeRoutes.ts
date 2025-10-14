import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";
import { employeeController } from "../controllers/employeeController";

const router: Router = express.Router();

router.get("/", employeeController.getAll);
router.post("/", validateRequest(employeeSchemas.create),employeeController.create);
router.get("/:id",validateRequest(employeeSchemas.getById),employeeController.getById);
router.put("/:id",validateRequest(employeeSchemas.update),employeeController.update);
router.delete("/:id",validateRequest(employeeSchemas.delete),employeeController.delete);
router.get("/branch/:branchId",validateRequest(employeeSchemas.getByBranchId),employeeController.getByBranchId);
router.get("/department/:department",validateRequest(employeeSchemas.getByDepartment),employeeController.getByDepartment);

export default router;