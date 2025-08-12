exports.controller = async (req, res, next, db) => {
  const orders = await db.namedQueryAll(
    `
      SELECT
        O.id,
        U.name,
        U.phone_number,
        P.product_name,
        P.price,
        P.description
      FROM orders o
      JOIN users U ON o.user_id = U.id
      JOIN products P ON o.product_id = P.id
    `
  );

  res.status(200).json(orders);
};
