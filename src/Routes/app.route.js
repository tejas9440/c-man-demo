const express = require("express");
const router = express.Router();

const productRoute = require("./product.route");
const userRoute = require("./user.route");
const orderRoute = require("./order.route");

router.use("/product", productRoute);
router.use("/user", userRoute);
router.use("/order", orderRoute);

module.exports = router;
