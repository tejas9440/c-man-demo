const Joi = require("joi");
const ServerError = require("../../utils/serverError");
const Schema = require("../../config/validationSchema");

exports.validationSchema = {
  params: Joi.object({
    user_id: Schema.uuid().required(),
  }),
};
exports.controller = async (req, res, next, db) => {
  const { user_id } = req.params;

  try {
    await db.query("BEGIN");

    await db.namedQueryOne(
      `
        UPDATE users
        SET is_deleted = TRUE, deleted_at = NOW()
        WHERE id = $user_id
        RETURNING *
      `,
      { user_id }
    );
    await db.query("COMMIT");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);

    await db.query("ROLLBACK");
  }
};
