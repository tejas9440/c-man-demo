exports.controller = async (req, res, next) => {
  res.status(200).json({
    message: "User logged out successfully",
  });
};
