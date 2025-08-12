const express = require("express");
const router = express.Router();

const productRoute = require("./product.route");
const userRoute = require("./user.route");
const orderRoute = require("./order.route");
const authRoute = require("./auth.route");

router.use("/product", productRoute);
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/", authRoute);

module.exports = router;
