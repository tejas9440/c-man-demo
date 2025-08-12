const config = require("./config");
const winston = require("winston");
const { format, transports } = winston;
const { timestamp, combine, printf, colorize, uncolorize } = format;
const { loggerOptions } = require("../../config/var");

winston.addColors(config.customLevels.colors);

const TS = timestamp({ format: "YYYY-MM-DD HH:mm:ss" });

const consoleFormate = {
  dev: printf(
    (info) =>
      `[${info.timestamp}] ${info.level} : ${info.message} ${
        info.stack ? `\n ${info.stack}` : ""
      }`
  ),
  prod: printf(
    (info) =>
      `[${info.timestamp}]  {"level": "${info.level}", "service":"${
        info.service
      }", "message":"${info.message.trim()}", "stack": "${
        info.stack ? info.stack : ""
      }"}`
  ),
};

const consoleLogOptions = {
  level: loggerOptions.consoleLogLevel,
  handleExceptions: true,
  format: combine(
    TS,
    loggerOptions.env === "dev" ? colorize() : uncolorize(),
    consoleFormate[loggerOptions.env]
  ),
};

const fileLogOptions = {
  level: loggerOptions.fileLogLevel,
  filename: "logs/combine.log",
  maxSize: "1m",
  format: combine(TS, consoleFormate.prod),
};

const logger = winston.createLogger({
  levels: config.customLevels.levels,
  defaultMeta: { service: loggerOptions.appName },
  transports: [
    new transports.Console(consoleLogOptions),
    new transports.File(fileLogOptions),
  ],
});

module.exports = logger;
