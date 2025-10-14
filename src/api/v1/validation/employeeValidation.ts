import Joi from "joi";

// Multi-level schemas for employee operations
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

