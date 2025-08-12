const express = require("express");
const withDatabase = require("../utils/withDatabase");
const router = express.Router();
const { validate } = require("../utils/validationHelper");
const createProduct = require("../components/products/createProduct");
const listProduct = require("../components/products/listProduct");
const getProduct = require("../components/products/getProducts");
const updateProduct = require("../components/products/updateProduct");
const deleteProduct = require("../components/products/deleteProduct");
const validateToken = require("../middleware/auth/validateToken");

router
  .route("/")
  .post(
    validateToken,
    validate(createProduct.validationSchema),
    withDatabase(createProduct.controller)
  )
  .get(validateToken, withDatabase(listProduct.controller));

router
  .route("/:product_id")
  .get(
    validateToken,
    validate(getProduct.validationSchema),
    withDatabase(getProduct.controller)
  )
  .patch(
    validateToken,
    validate(updateProduct.validationSchema),
    withDatabase(updateProduct.controller)
  )
  .delete(
    validateToken,
    validate(deleteProduct.validationSchema),
    withDatabase(deleteProduct.controller)
  );

module.exports = router;
