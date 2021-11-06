const { Model } = require("objection")
const Shop = require("./Shop")

class Product extends Model {
  static tableName = "product"
  static idColumn = "id"
  static relationMappings = {
    shop: {
      relation: Model.BelongsToOneRelation,
      modelClass: Shop,
      join: {
        from: "product.shop_id",
        to: "shop.id",
      },
    },
  }
}

module.exports = Product
