const Joi = require("joi");
const ServerError = require("../../utils/serverError");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  param: Joi.object({
    product_id: Schema.uuid().required(),
  }),

  body: Joi.object({
    product_name: Schema.name().optional(),
    description: Schema.product.description().optional(),
    price: Schema.product.price().optional(),
  }).min(1),
};

/**
 * @param {DatabaseClient} db
 */

exports.controller = async (req, res, next, db) => {
  const { product_id } = req.params;
  const { product_name, description, price } = req.body;

  const update = [];
  const parmas = { product_id };

  if (product_name) {
    update.push("product_name = $product_name");
    parmas.product_name = product_name;
  }
  if (description) {
    update.push("description = $description");
    parmas.description = description;
  }
  if (price) {
    update.push("price = $price");
    parmas.price = price;
  }

  if (update.length === 0) {
    throw new ServerError("BAD_REQUEST", "No fields to update");
  }
  update.push("update_at = NOW()");

  const query = `
    UPDATE products
    SET ${update.join(", ")}
    WHERE id = $product_id
    RETURNING *;
  `;

  const product = await db.namedQueryOne(query, parmas);

  if (!product) throw new ServerError("NOT_FOUND", "Product not found");

  res.status(200).send(product);
};
