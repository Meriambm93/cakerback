const { Model } = require("objection")

class Category extends Model {
  static tableName = "category"
  static idColumn = "id"
}

module.exports = Category