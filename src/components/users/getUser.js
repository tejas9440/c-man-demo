const Joi = require("joi");
const Schema = require("../../config/validationSchema");
const ServerError = require("../../utils/serverError");

exports.validationSchema = {
  params: Joi.object({
    user_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { user_id } = req.params;

  const user = await db.namedQueryOne(
    `SELECT * FROM users WHERE id = $user_id`,
    { user_id }
  );

  if (!user) throw new ServerError("not_found", "User not found.");

  res.status(200).json(user);
};
