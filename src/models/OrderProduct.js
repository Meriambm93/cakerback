const { Model } = require("objection")
const Order = require("./Order")
const Product = require("./Product")

class OrderProduct extends Model {
  static tableName = "rel_order__product"
  static idColumn = ["order_id", "product_id"]

  static relationMappings = {
    order: {
      relation: OrderProduct.HasOneRelation,
      modelClass: Order,
      join: {
        from: "rel_order__product.order_id",
        to: "order.id",
      },
    },
    product: {
      relation: OrderProduct.HasOneRelation,
      modelClass: Product,
      join: {
        from: "rel_order__product.product_id",
        to: "product.id",
      },
    },
  }
}

module.exports = OrderProduct
