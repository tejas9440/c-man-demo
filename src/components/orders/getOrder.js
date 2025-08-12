const Joi = require("joi");
const Schema = require("../../config/validationSchema");
const ServerError = require("../../utils/serverError");

exports.validationSchema = {
  params: Joi.object({
    order_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { order_id } = req.params;

  const order = await db.namedQueryOne(
    `
       SELECT
        O.id,
        U.name,
        U.phone_number,
        P.product_name,
        P.price,
        P.description
      FROM orders o
      JOIN users U ON o.user_id = U.id
      JOIN products P ON o.product_id = P.id
      WHERE o.id = $order_id
    `,
    { order_id }
  );

  if (!order) throw new ServerError("not_found", "Order not found.");

  res.status(200).json(order);
};
