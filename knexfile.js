const { resolve } = require("path")
module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    database: "caker",
    user: "debian-sys-maint",
    password: "YHjQGfZrNN7QjNd1",
  },
  migrations: {
    directory: resolve(__dirname, "src/migrations"),
  },
}
