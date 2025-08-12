const Joi = require('joi');
const Schema = require('../../config/validationSchema');

/**
 * @param {DatabaseClient} db
 */

exports.validationSchema = {
  bodt: Joi.object({
    name: Schema.name().required(),
    phone_number: Schema.user.phoneNumber(),
    password: Schema.user.password()
  })
}

exports.controller = async (req, res, next, db) => {
  const { name, phone_number, password } = req.body

  const newUser = await db.namedQueryOne(
    `
      INSERT INTO users (name,phone_number,password)
      VALUES ($name,$phone_number,$password)
      RETURNING *
    `,
    { name, phone_number, password }
  );

  res.status(200).json(newUser);

}
