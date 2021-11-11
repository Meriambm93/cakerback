const ProductCategory = require("../models/ProductCategory")

const ProductCategoryRoute = ({ app }) => {
  // ProductCategory
  // CREATE
  app.post("/ProductCategory", async (req, res) => {
    const {
      body: { product_id, category_id },
    } = req

    const productCategory = await ProductCategory.query()
      .insertAndFetch({
        product_id,
        category_id,
      })
      .withGraphFetched("product")
      .withGraphFetched("category")

    res.send(productCategory)
  })
  // READ INDEX
  app.get("/productCategory", async (req, res) => {
    const productCategories = await ProductCategory.query()
      .withGraphFetched("product")
      .withGraphFetched("category")

    res.send(productCategories)
  })
}

module.exports = ProductCategoryRoute
