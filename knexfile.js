const config = require("./src/config")
const { resolve } = require("path")
module.exports = {
  client: config.db.client,
  connection: config.db.connection,
  migrations: {
    directory: resolve(__dirname, "src/migrations"),
  },
}
