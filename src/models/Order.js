const { Model } = require("objection")
const User = require("./User")
const Shop = require("./Shop")

class Order extends Model {
  static tableName = "order"
  static idColumn = "id"
  static relationMappings = {
    user: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: "order.user_id",
        to: "user.id",
      },
    },
    shop: {
      relation: Model.HasManyRelation,
      modelClass: Shop,
      join: {
        from: "order.shop_id",
        to: "shop.id",
      },
    },
  }
}

module.exports = Order
