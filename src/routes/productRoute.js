const Product = require("../models/Product")

const productRoute = ({ app }) => {
  app.post("/product", async (req, res) => {
    const {
      body: { name, price, mainPicture, secondaryPicture, shop_id },
    } = req
    const product = await Product.query()
      .insertAndFetch({
        name,
        price,
        mainPicture,
        secondaryPicture,
        shop_id,
      })
      .withGraphFetched("shop")
    res.send({ status: "success" })
  })
  // READ INDEX
  app.get("/product", async (req, res) => {
    const products = await Product.query().withGraphFetched("shop")

    res.send(products)
  })
  // READ SINGLE
  app.get("/product/:productId", async (req, res) => {
    const {
      params: { productId },
    } = req
    const product = await Product.query()
      .findById(productId)
      .withGraphFetched("shop")

    if (!product) {
      return res.status(404).send({ error: "product not found" })
    }

    res.send(product)
  })
  // UPDATE
  app.put("/product/:productId", async (req, res) => {
    const {
      params: { productId },
      body: { name, price, mainPicture, secondaryPicture, shop_id },
    } = req

    const product = await Product.query()
      .updateAndFetchById(shopId, {
        name,
        price,
        mainPicture,
        secondaryPicture,
        shop_id,
      })
      .withGraphFetched("shop")

    res.send(product)
  })
  // DELETE
  app.delete("/product/:productId", async (req, res) => {
    const {
      params: { sproductId },
    } = req
    const product = await Product.query().findById(productId)

    if (!product) {
      return res.status(404).send({ error: "product not found" })
    }

    await Product.query().deleteById(productId)

    res.send(product)
  })
}

module.exports = productRoute
