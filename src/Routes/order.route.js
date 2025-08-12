const express = require("express");
const router = express.Router();
const withDatabase = require("../utils/withDatabase");
const { validate } = require("../utils/validationHelper");
const createOrder = require("../components/orders/createOrder");
const getOrders = require("../components/orders/getOrder");
const listOrder = require("../components/orders/listOrder");
const updateOrder = require("../components/orders/updateOrder");
const deleteOrder = require("../components/orders/deleteOrder");
const validateToken = require("../middleware/auth/validateToken");

router
  .route("/")
  .post(
    validateToken,
    validate(createOrder.validationSchema),
    withDatabase(createOrder.controller)
  )
  .get(validateToken, withDatabase(listOrder.controller));

router
  .route("/:order_id")
  .get(validate(getOrders.validationSchema), withDatabase(getOrders.controller))
  .patch(
    validate(updateOrder.validationSchema),
    withDatabase(updateOrder.controller)
  )
  .delete(
    validate(deleteOrder.validationSchema),
    withDatabase(deleteOrder.controller)
  );

module.exports = router;
