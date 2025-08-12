const { Pool, types } = require("pg");
const { database } = require("../../config/var");

const dbConfig = {
  user: database.user,
  password: database.password,
  host: database.host,
  port: database.port,
  database: database.database,
  max: 80,

  ssl: {
    rejectUnauthorized: false,
  },

  connectionTimeoutMillis: 30000, // How long (in milliseconds) the client will wait when first trying to connect before giving up. 30 seconds
  idleTimeoutMillis: 900000, // How long a client in the connection pool can sit idle (unused) before being closed. (15 minutes X 60 seconds X 1000 milliseconds == 15 minutes)
  statement_timeout: 30000, // Tells PostgreSQL to cancel any SQL statement that takes longer than this time. 30 seconds.
  query_timeout: 30000, //Client-side timeout — if the query doesn’t return in this time, the client will abort it. 30 seconds.
};

const pool = new Pool(dbConfig);

types.setTypeParser(1700, (val) => parseFloat(val));

const convertNamedQueryToPositional = (sqlStmt, params) => {
  const values = [];
  const fields = [];
  let paramIndex = 1;

  const newQueryText = sqlStmt.replace(/\$\w+/g, (match) => {
    const paramName = match.substring(1);
    fields.push(paramName);
    values.push(params[paramName]);
    const result = `$${paramIndex}`;
    paramIndex += 1;
    return result;
  });

  return { sqlStmt: newQueryText, params: values };
};

const convertStringLiteralToQuery = (strings, ...values) => {
  return {
    sqlStmt: strings.reduce(
      (query, str, i) => query + str + (i < values.length ? `$${i + 1}` : ""),
      ""
    ),
    params: values,
  };
};

const getConnection = async () => {
  const client = await pool.connect();

  const queryAll = async (sqlStmt, params) => {
    const res = await client.query(sqlStmt, params);
    return res.rows;
  };

  const queryOne = async (sqlStmt, params) => {
    const res = await queryAll(sqlStmt, params);
    return res[0];
  };

  const namedQueryAll = async (sqlStmt, params) => {
    const newQuery = convertNamedQueryToPositional(sqlStmt, params);
    const res = await queryAll(newQuery.sqlStmt, newQuery.params);
    return res;
  };

  async function namedQueryOne(sqlStmt, params) {
    const res = await namedQueryAll(sqlStmt, params);
    return res[0];
  }

  async function queryLiteralAll(strings, ...values) {
    const newQuery = convertStringLiteralToQuery(strings, ...values);
    const res = await queryAll(newQuery.sqlStmt, newQuery.params);
    return res;
  }

  async function queryLiteralOne(strings, ...values) {
    const res = await queryLiteralAll(strings, ...values);
    return res[0];
  }

  const obj = {
    client,
    query: (sqlStmt, params) => client.query(sqlStmt, params),
    release: () => client.release(),
    namedQueryAll,
    namedQueryOne,
    queryAll,
    queryOne,
    queryLiteralAll,
    queryLiteralOne,
  };

  return obj;
};

module.exports = {
  getConnection,
};
