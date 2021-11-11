const { Model } = require("objection")

class Ingredient extends Model {
  static tableName = "ingredient"
  static idColumn = "id"
}

module.exports = Ingredient
