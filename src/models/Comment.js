const { Model } = require("objection")
const User = require("./User")
const Shop = require("./Shop")
class Comment extends Model {
  static tableName = "comment"
  static idColumn = "id"
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "comment.user_id",
        to: "user.id",
      },
    },
    shop: {
      relation: Model.BelongsToOneRelation,
      modelClass: Shop,
      join: {
        from: "comment.shop_id",
        to: "shop.id",
      },
    },
  }
}
module.exports = Comment
