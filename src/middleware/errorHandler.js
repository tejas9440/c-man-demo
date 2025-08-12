const { ValidationError } = require("../utils/validationHelper");
const ServerError = require("../utils/serverError");
const Logger = require("../config/constant");
const { errorCode } = require("../config/constant");

const errorHandler = (err, req, res, next) => {
  //! Validation Errors
  if (err instanceof ValidationError) {
    Logger.warn({
      message: "Validation Error",
      stack: JSON.stringify(err.details),
    });
    return res.status(400).json({
      code: "validation_error",
      message: "parameters are not valid",
      details: err.details,
    });
  }
  Logger.error(err.message || err.code, { stack: err.stack });

  //! Server Errors
  if (err instanceof ServerError) {
    const errorInfo = err.info();
    if (errorInfo)
      return res.status(errorInfo.httpStatusCode).json(errorInfo.body);
  }

  //! Postgres Errors
  if (errorCode.postgres[err.code]) {
    const { httpStatusCode, code, message, constraint } =
      errorCode.postgres[err.code];

    return res.status(httpStatusCode).json({
      code,
      message: constraint[err.constraint] || message,
    });
  }

  return res.status(500).json({
    code: "internal_server_error",
    message: "Internal server error",
    details: {
      developer: {
        message: err.message || "Internal server error",
      },
    },
  });
};

module.exports = errorHandler;
