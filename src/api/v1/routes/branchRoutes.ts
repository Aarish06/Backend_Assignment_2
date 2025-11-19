import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/branchValidation";
import { branchController } from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieve all library branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: Successfully fetched all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 branches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAll);

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchCreate'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '400':
 *         description: Validation error — invalid request data
 */
router.post(
  "/",
  validateRequest(branchSchemas.create),
  branchController.create
);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique branch ID
 *     responses:
 *       '200':
 *         description: Branch retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '404':
 *         description: Branch not found
 */
router.get(
  "/:id",
  validateRequest(branchSchemas.getById),
  branchController.getById
);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
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
 *             $ref: '#/components/schemas/BranchUpdate'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '404':
 *         description: Branch not found
 */
router.put(
  "/:id",
  validateRequest(branchSchemas.update),
  branchController.update
);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 */
router.delete(
  "/:id",
  validateRequest(branchSchemas.delete),
  branchController.delete
);

export default router;
