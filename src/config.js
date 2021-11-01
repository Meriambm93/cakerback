const config = {
  db: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  app: {
    port: process.env.APP_PORT,
  },
  security: {
    password: {
      saltLength: 64,
      hashLength: 64,
      iteration: 1000000,
      algo: "sha512",
      minLength: 8,
      pattern: /[\w-]+/gi,
    },
  },
}
module.exports = config
