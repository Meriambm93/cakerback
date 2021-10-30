const { Model } = require("objection")

class Role extends Model {
  static tableName = "role"
  static idColumn = "id"
}

module.exports = Role
