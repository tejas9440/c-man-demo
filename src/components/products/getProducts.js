const Joi = require("joi");
const Schema = require("../../config/validationSchema");
const ServerError = require("../../utils/serverError");

exports.validationSchema = {
  params: Joi.object({
    product_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { product_id } = req.params;

  const product = await db.namedQueryOne(
    `SELECT * FROM products WHERE id = $product_id`,
    { product_id }
  );

  if (!product) throw new ServerError("not_found", "Product not found.");

  res.status(200).json(product);
};
