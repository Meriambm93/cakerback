const { Model } = require("objection")
const User = require("./User")

class Shop extends Model {
  static tableName = "shop"
  static idColumn = "id"
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "shop.user_id",
        to: "user.id",
      },
    },
  }
}

module.exports = Shop
