const express = require("express");
const router = express.Router();
const withDatabase = require("../utils/withDatabase");
const { validate } = require("../utils/validationHelper");
const createUser = require("../components/users/createUser");
const getUser = require("../components/users/getUser");
const listUser = require("../components/users/listUsers");
const deleterUser = require("../components/users/deleteUser");
const updateuser = require("../components/users/updateUser");

router
  .route("/")
  .post(
    validate(createUser.validationSchema),
    withDatabase(createUser.controller)
  )
  .get(validate(listUser.validationSchema), withDatabase(listUser.controller));

router
  .route("/:user_id")
  .get(
    validate(getUser.validationSchema),
    withDatabase(getUser.validationSchema)
  )
  .patch(
    validate(updateuser.validationSchema),
    withDatabase(updateuser.controller)
  )
  .delete(
    validate(deleterUser.validationSchema),
    withDatabase(deleterUser.controller)
  );

module.exports = router;
