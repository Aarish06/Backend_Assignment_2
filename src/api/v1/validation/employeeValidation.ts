import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       description: Represents an employee in a branch/department
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the employee
 *           example: 101
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "Aarish Bansal"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Employee's job title or position
 *           example: "Sales Associate"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's email address
 *           example: "aarish@example.com"
 *         phone:
 *           type: string
 *           description: Employee's phone number (supports international formats)
 *           example: "+1-204-555-1234"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Department where the employee works
 *           example: "Sales"
 *         branchId:
 *           type: integer
 *           description: ID of the branch where the employee is assigned
 *           example: 3
 *       required:
 *         - name
 *         - position
 *         - email
 *         - phone
 *         - department
 *         - branchId
 *
 *     EmployeeCreate:
 *       type: object
 *       description: Payload used to create a new employee
 *       required:
 *         - name
 *         - position
 *         - email
 *         - phone
 *         - department
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Aarish Bansal"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Branch Manager"
 *         email:
 *           type: string
 *           format: email
 *           example: "employee@example.com"
 *         phone:
 *           type: string
 *           description: Valid phone number (e.g. +1-204-555-1234 or 2045551234)
 *           example: "+1-431-555-9876"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Human Resources"
 *         branchId:
 *           type: integer
 *           description: Existing branch ID
 *           example: 5
 *
 *     EmployeeUpdate:
 *       type: object
 *       description: Payload used to update an existing employee
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Updated Name"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Senior Sales Associate"
 *         email:
 *           type: string
 *           format: email
 *           example: "updated@example.com"
 *         phone:
 *           type: string
 *           description: Valid phone number (10–15 characters, digits and symbols)
 *           example: "204-777-8888"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Marketing"
 *         branchId:
 *           type: integer
 *           example: 7
 */

export const employeeSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
      }),
      position: Joi.string().min(2).max(50).required().messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
      }),
      phone: Joi.string().pattern(/^[+]?[\d\s\-()]{7,20}$/).required().messages({
          "any.required": "Phone number is required",
          "string.empty": "Phone number cannot be empty",
          "string.pattern.base":
            "Phone number must be valid (e.g. +1-204-555-1234 or 2045551234)",
        }),
      department: Joi.string().min(2).max(50).required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
      }),
      branchId: Joi.number().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
      }),
    }),
  },

  update: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).optional(),
      position: Joi.string().min(2).max(50).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().pattern(/^[0-9\-()\s]{10,15}$/).optional(),
      department: Joi.string().min(2).max(50).optional(),
      branchId: Joi.number().optional(),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.number().required().messages({
        "any.required": "Employee ID is required",
        "string.empty": "Employee ID cannot be empty",
      }),
    }),
  },

  delete: {
    params: Joi.object({
      id: Joi.number().required().messages({
        "any.required": "Employee ID is required",
        "string.empty": "Employee ID cannot be empty",
      }),
    }),
  },
  getByBranchId: {
    params: Joi.object({
      branchId: Joi.number().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
      }),
    }),
  },

  getByDepartment: {
    params: Joi.object({
      department: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
      }),
    }),
  },
};

