const express = require("express");
const withDatabase = require("../utils/withDatabase");
const router = express.Router();
const { validate } = require("../utils/validationHelper");
const createProduct = require("../components/products/createProduct");
const listProduct = require("../components/products/listProduct");
const getProduct = require("../components/products/getProducts");
const updateProduct = require("../components/products/updateProduct");
const deleteProduct = require("../components/products/deleteProduct");

router
  .route("/")
  .post(
    validate(createProduct.validationSchema),
    withDatabase(createProduct.controller)
  )
  .get(withDatabase(listProduct.controller));

router
  .route("/:product_id")
  .get(
    validate(getProduct.validationSchema),
    withDatabase(getProduct.controller)
  )
  .patch(
    validate(updateProduct.validationSchema),
    withDatabase(updateProduct.controller)
  )
  .delete(
    validate(deleteProduct.validationSchema),
    withDatabase(deleteProduct.controller)
  );

module.exports = router;
