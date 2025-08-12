exports.controller = async (req, res, next, db) => {
  const users = await db.namedQueryAll(
    `
      SELECT * FROM users
    `
  );

  if (!users) res.json({ message: "No User Found!!" });

  res.status(200).json(users);
};
