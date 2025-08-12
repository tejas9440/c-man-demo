const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const qs = require("qs");
const Logger = require("./service/logger");
const { port } = require("./config/var");
const apiRoute = require("./Routes/app.route");

const app = express();

app.use(
  morgan(":method :url Status : :status, Time taken: :response-time ms", {
    stream: { write: (message) => Logger.info(message) },
  })
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  const rawQuery = req.url.split("?")[1] || "";
  req.customQuery = qs.parse(rawQuery);
  next();
});

app.get("/ping", (req, res) => res.send("pong"));

app.use("/api", apiRoute);

//! Showing Error in json format

app.use((err, req, res, next) => {
  if (err.isJoi || err.name === "ValidationError") {
    return res.status(400).json({
      error: err.message,
      details: err.details,
    });
  }

  if (err.name === "ServerError") {
    return res.status(err.statusCode || 500).json({
      error: err.message,
      code: err.code,
    });
  }

  res.status(500).json({
    error: err.message,
  });
});

app.listen(port, () => {
  Logger.info(`Server PORT : ${port}`);
});
