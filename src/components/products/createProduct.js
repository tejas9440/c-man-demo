const Joi = require("joi");
const Schema = require("../../config/validationSchema");

/**
 * @param {DatabaseClient} db
 */

exports.validationSchema = {
  body: Joi.object({
    product_name: Schema.name().required(),
    description: Schema.product.description(),
    price: Schema.product.price(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { product_name, description, price } = req.body;

  const newProduct = await db.namedQueryOne(
    `
    INSERT INTO products (product_name,price,description) values($product_name,$price,$description)
    RETURNING *
    `,
    { product_name, description, price }
  );
  res.status(200).json(newProduct);
};
