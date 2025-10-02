import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

const router = Router();

router.post("/", employeeController.create);
router.get("/", employeeController.getAll);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);

router.get("/branch/:branchId", employeeController.getByBranchId);
router.get("/department/:department", employeeController.getByDepartment);

router.get("/:id", employeeController.getById);

export default router;