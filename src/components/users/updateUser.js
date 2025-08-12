const Joi = require("joi");
const ServerError = require("../../utils/serverError");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  param: Joi.object({
    user_id: Schema.uuid().required(),
  }),

  body: Joi.object({
    name: Schema.name().optional(),
    phone_number: Schema.user.phoneNumber().optional(),
    password: Schema.user.password().optional()
  }).min(1),
};

/**
 * @param {DatabaseClient} db
 */

exports.controller = async (req, res, next, db) => {
  const { user_id } = req.params;
  const { name, phone_number, password } = req.body;

  const update = [];
  const parmas = { user_id };

  if (name) {
    update.push("name = $name");
    parmas.name = name;
  }
  if (phone_number) {
    update.push("phone_number = $phone_number");
    parmas.phone_number = phone_number;
  }
  if (password) {
    update.push("password = $password");
    parmas.password = password;
  }

  if (update.length === 0) {
    throw new ServerError("BAD_REQUEST", "No fields to update");
  }
  update.push("update_at = NOW()");

  const query = `
    UPDATE users
    SET ${update.join(", ")}
    WHERE id = $user_id
    RETURNING *;
  `;

  const user = await db.namedQueryOne(query, parmas);

  if (!user) throw new ServerError("NOT_FOUND", "User not found");

  res.status(200).send(user);
};
