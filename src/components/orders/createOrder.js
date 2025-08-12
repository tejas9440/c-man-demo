const Joi = require("joi");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  body: Joi.object({
    user_id: Schema.uuid().required(),
    product_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { user_id, product_id } = req.body;

  const newOrder = await db.namedQueryOne(
    `
      INSERT INTO orders (user_id, product_id)
      VALUES ($user_id, $product_id)
      RETURNING *
    `,
    { user_id, product_id }
  );

  res.status(200).json(newOrder);
};
