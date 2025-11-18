import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";
import { employeeController } from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successfully fetched employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAll);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCreate'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Validation error — invalid input
 */
router.post(
  "/",
  validateRequest(employeeSchemas.create),
  employeeController.create
);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique employee ID
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 */
router.get(
  "/:id",
  validateRequest(employeeSchemas.getById),
  employeeController.getById
);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 */
router.put(
  "/:id",
  validateRequest(employeeSchemas.update),
  employeeController.update
);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 */
router.delete(
  "/:id",
  validateRequest(employeeSchemas.delete),
  employeeController.delete
);

/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to filter employees
 *     responses:
 *       '200':
 *         description: Employees retrieved by branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: No employees found for this branch
 */
router.get(
  "/branch/:branchId",
  validateRequest(employeeSchemas.getByBranchId),
  employeeController.getByBranchId
);

/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Get employees by department name
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name to filter employees
 *     responses:
 *       '200':
 *         description: Employees retrieved by department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: No employees found for this department
 */
router.get(
  "/department/:department",
  validateRequest(employeeSchemas.getByDepartment),
  employeeController.getByDepartment
);

export default router;