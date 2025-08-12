const Joi = require("joi");
const ServerError = require("../../utils/serverError");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  params: Joi.object({
    order_id: Schema.uuid().required(),
  }),
  body: Joi.object({
    user_id: Schema.uuid().required(),
    product_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { order_id } = req.params;
  const { user_id, product_id } = req.body;

  const order = await db.namedQueryOne(
    `
      UPDATE orders
      SET
       user_id = $user_id,
       product_id = $product_id
       WHERE id = $order_id
       RETURNING *;
    `,
    { order_id, user_id, product_id }
  );

  if (!order) throw new ServerError("NOT_FOUND", "Order not found");

  res.status(200).send(order);
};
