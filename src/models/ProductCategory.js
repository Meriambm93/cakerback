const { Model } = require("objection")
const Category = require("./Category")
const Product = require("./Product")

class ProductCategory extends Model {
  static tableName = "rel_product__category"
  static idColumn = ["product_id", "category_id"]

  static relationMappings = {
    product: {
      relation: ProductCategory.HasOneRelation,
      modelClass: Product,
      join: {
        from: "rel_product__category.product_id",
        to: "product.id",
      },
    },
    category: {
      relation: ProductCategory.HasOneRelation,
      modelClass: Category,
      join: {
        from: "rel_product__category.category_id",
        to: "category.id",
      },
    },
  }
}

module.exports = ProductCategory
