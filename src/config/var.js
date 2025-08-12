const env = require('./env')

module.exports = {
  env:env.env,
  port: env.port,
  jwtSecret: env.jwtSecret,
  // masterKey: env.masterKey,

  database: {
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbDatabase,
  },

  loggerOptions: {
    env: env.env,
    consoleLogLevel: env.consoleLogLevel,
    fileLogLevel: env.fileLogLevel,
    appName: env.serviceName,
  },

}
