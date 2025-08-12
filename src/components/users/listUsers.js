exports.controller = async (req, res, next, db) => {
  const users = await db.namedQueryAll(
    `
      SELECT * FROM users
    `
  );

  res.status(200).json(users);
};
