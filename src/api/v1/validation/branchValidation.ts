import Joi from "joi";

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
