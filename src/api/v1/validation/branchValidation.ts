import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       description: Represents a physical branch location
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the branch
 *           example: 10
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           description: Full address of the branch
 *           example: "123 Portage Ave, Winnipeg, MB"
 *         phone:
 *           type: string
 *           description: Valid phone number (10–15 digits)
 *           example: "204-555-1234"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was created
 *           example: "2025-02-18T14:20:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was last updated
 *           example: "2025-02-19T09:10:00Z"
 *
 *     BranchCreate:
 *       type: object
 *       description: Payload used to create a new branch
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "RRC Polytech Campus Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           example: "2055 Notre Dame Ave, Winnipeg, MB"
 *         phone:
 *           type: string
 *           description: Valid phone number (10–15 digits)
 *           example: "431-555-7788"
 *
 *     BranchUpdate:
 *       type: object
 *       description: Payload to update branch fields
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Updated Branch Name"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           example: "500 Main Street, Winnipeg, MB"
 *         phone:
 *           type: string
 *           example: "204-444-7777"
 */

export const branchSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Branch name is required",
        "string.empty": "Branch name cannot be empty",
      }),
      address: Joi.string().min(5).max(200).required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
      }),
      phone: Joi.string().pattern(/^[0-9\-()\s]{10,15}$/).required().messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone must be 10 digits",
      }),
    }),
  },

  update: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).optional(),
      address: Joi.string().min(5).max(200).optional(),
      phone: Joi.string().pattern(/^[0-9\-()\s]{10,15}$/).optional(),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.number().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
      }),
    }),
  },

  delete: {
    params: Joi.object({
      id: Joi.number().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
      }),
    }),
  },
};
