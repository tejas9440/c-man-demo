const Joi = require("joi");
const Schema = require("../../config/validationSchema");
const bcrypt = require("bcrypt");

/**
 * @param {DatabaseClient} db
 */

exports.validationSchema = {
  body: Joi.object({
    name: Schema.name().required(),
    phone_number: Schema.user.phoneNumber(),
    password: Schema.user.password(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { name, phone_number, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await db.namedQueryOne(
    `
      INSERT INTO users (name,phone_number,password)
      VALUES ($name,$phone_number,$hashPassword)
      RETURNING *
    `,
    { name, phone_number, hashPassword }
  );

  delete newUser.password; // Remove password from response

  res.status(200).json(newUser);
};
