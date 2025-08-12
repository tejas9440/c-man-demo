const Joi = require("joi");

module.exports = {
  uuid: () => Joi.string().guid({ version: "uuidv4" }).uuid(),

  name: () => Joi.string().trim().max(200),

  date: () => Joi.date().iso(),

  user: {
    phoneNumber: () =>
      Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message("Phone number must be 10 digits"),
    password: () =>
      Joi.string()
        .min(5)
        .max(30)
        .message("Password must be between 5 and 30 characters"),
  },

  product: {
    price: () => Joi.number().min(0).max(100000),
    description: () =>
      Joi.string()
        .trim()
        .max(1000)
        .allow("")
        .message("Description must be less than 500 characters"),
  },
};
