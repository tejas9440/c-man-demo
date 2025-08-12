const Token = require("../../utils/jwtToken");
const ServerError = require("../../utils/serverError");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) throw new ServerError("UNAUTHORIZED", "Token is required");
  const payload = Token.decode(token);
  if (!payload) throw new ServerError("UNAUTHORIZED", "Invalid token");

  req.token = payload;
  return next();
};

module.exports = validateToken;
