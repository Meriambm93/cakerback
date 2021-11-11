const ProductIngredient = require("../models/ProductIngredient")

const ProductIngredientRoute = ({ app }) => {
  // ProductIngredient
  // CREATE
  app.post("/productIngredient", async (req, res) => {
    const {
      body: { product_id, ingredient_id },
    } = req

    const productIngredient = await ProductIngredient.query()
      .insertAndFetch({
        product_id,
        ingredient_id,
      })
      .withGraphFetched("product")
      .withGraphFetched("ingredient")

    res.send(productIngredient)
  })
  // READ INDEX
  app.get("/productIngredient", async (req, res) => {
    const productIngredients = await ProductIngredient.query()
      .withGraphFetched("product")
      .withGraphFetched("ingredient")

    res.send(productIngredients)
  })
}

module.exports = ProductIngredientRoute
