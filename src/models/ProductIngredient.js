const { Model } = require("objection")
const Ingredient = require("./Ingredient")
const Product = require("./Product")

class ProductIngredient extends Model {
  static tableName = "rel_product__ingredient"
  static idColumn = ["product_id", "ingredient_id"]

  static relationMappings = {
    product: {
      relation: ProductIngredient.HasOneRelation,
      modelClass: Product,
      join: {
        from: "rel_product__ingredient.product_id",
        to: "product.id",
      },
    },
    ingredient: {
      relation: ProductIngredient.HasOneRelation,
      modelClass: Ingredient,
      join: {
        from: "rel_product__ingredient.ingredient_id",
        to: "ingredient.id",
      },
    },
  }
}

module.exports = ProductIngredient
