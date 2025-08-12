const Joi = require("joi");
const ServerError = require("../../utils/serverError");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  params: Joi.object({
    product_id: Schema.uuid().required(),
  }),
};
exports.controller = async (req, res, next, db) => {
  const { product_id } = req.params;

  try {
    await db.query("BEGIN");

    await db.namedQueryOne(
      `
        UPDATE products
        SET is_deleted = TRUE, deleted_at = NOW()
        WHERE id = $product_id
        RETURNING *
      `,
      { product_id }
    );
    await db.query("COMMIT");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);

    await db.query("ROLLBACK");
  }
};
