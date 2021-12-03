const Product = require("../models/Product")
const config = require("../config")
const { extname } = require("path")

const productRoute = ({ app }) => {
  app.post("/product", async (req, res) => {
    const {
      body: { name, price, description, shop_id },
    } = req
    const product = await Product.query()
      .insertAndFetch({
        name,
        price,
        description,
        shop_id,
      })
      .withGraphFetched("shop")

    res.send(product)
  })
  app.post("/upload-productImage/:productId/:num", async (req, res) => {
    const {
      files: { image },
      params: { productId, num },
    } = req
    if (!image) {
      return res.send(null)
    }
    const imagePath = `${productId}_${num}${extname(image.name)}`
    image?.mv(`${config.upload.directory}/${imagePath}`)
    res.send({})
  })

  // READ INDEX
  app.get("/product", async (req, res) => {
    const {
      query: { shop_id },
    } = req
    const query = Product.query().withGraphFetched("shop")

    if (shop_id) {
      query.where("shop_id", shop_id)
    }

    res.send(await query)
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
      .updateAndFetchById(productId, {
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
      params: { productId },
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
