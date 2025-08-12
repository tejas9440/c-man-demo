const Joi = require("joi");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  params: Joi.object({
    order_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { order_id } = req.params;

  try {
    await db.query("BEGIN");

    await db.namedQueryOne(
      `
        DELETE FROM orders
        WHERE id = $order_id
      `,
      { order_id }
    );
    await db.query("COMMIT");
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);

    await db.query("ROLLBACK");
  }
};
