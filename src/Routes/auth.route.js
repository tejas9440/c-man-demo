const express = require("express");
const router = express.Router();
const loginUser = require("../components/auth/loginUser");
const { validate } = require("../utils/validationHelper");
const withDatabase = require("../utils/withDatabase");
const { validateToken } = require("../middleware/auth");
const logOut = require("../components/auth/logOut");

/**
 * @param {DatabaseClient} db
 */

router
  .route("/login")
  .post(
    validate(loginUser.validationSchema),
    withDatabase(loginUser.controller)
  );

router.route("/logout").get(validateToken, logOut.controller);

module.exports = router;
