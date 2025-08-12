const express = require("express");
const router = express.Router();
const withDatabase = require("../utils/withDatabase");
const { validate } = require("../utils/validationHelper");
const createOrder = require("../components/orders/createOrder");
const getOrders = require("../components/orders/getOrders");
const listOrder = require("../components/orders/listOrder");
const updateOrder = require("../components/orders/updateOrder");
const deleteOrder = require("../components/orders/deleteOrder");

router
  .route("/")
  .post(
    validate(createOrder.validationSchema),
    withDatabase(createOrder.controller)
  )
  .get(
    validate(listOrder.validationSchema),
    withDatabase(listOrder.controller)
  );

router
  .route("/:user_id")
  .get(
    validate(getOrders.validationSchema),
    withDatabase(getOrders.validationSchema)
  )
  .patch(
    validate(updateOrder.validationSchema),
    withDatabase(updateOrder.controller)
  )
  .delete(
    validate(deleteOrder.validationSchema),
    withDatabase(deleteOrder.controller)
  );

module.exports = router;
