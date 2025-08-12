const Joi = require("joi");
const Database = require("../../service/database");

exports.controller = async (req, res, next, db) => {
  const products = await db.namedQueryAll(
    `
      SELECT * FROM products
    `
  );

  res.status(200).json(products);
};
