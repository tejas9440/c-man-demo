const Joi = require("joi");
const Schema = require("../../config/validationSchema");
const bcrypt = require("bcrypt");
const ServerError = require("../../utils/serverError");
const jwt = require("../../utils/jwtToken");

exports.validationSchema = {
  body: Joi.object({
    phone_number: Schema.user.phoneNumber().required(),
    password: Schema.user.password().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { phone_number, password } = req.body;
  const user = await db.namedQueryOne(
    `
      SELECT * FROM users WHERE phone_number = $phone_number
    `,
    { phone_number }
  );

  if (!user)
    throw new ServerError("INVALID_DATA", "'phone number is incorrect'");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new ServerError("INVALID_DATA", "'password is incorrect'");

  const token = jwt.encode({ userId: user.id });

  res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      phone_number: user.phone_number,
    },
  });
};
