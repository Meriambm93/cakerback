const Shop = require("../models/Shop")

const shopRoute = ({ app }) => {
  // shop
  // CREATE
  app.post("/shop", async (req, res) => {
    const {
      body: { name, address, city, zipCode, picture, user_id },
    } = req

    const shop = await Shop.query()
      .insertAndFetch({
        name,
        address,
        city,
        zipCode,
        picture,
        user_id,
      })
      .withGraphFetched("user")

    res.send(shop)
  })
  // READ INDEX
  app.get("/shop", async (req, res) => {
    const shops = await Shop.query().withGraphFetched("user")

    res.send(shops)
  })
  // READ SINGLE
  app.get("/shop/:shopId", async (req, res) => {
    const {
      params: { shopId },
    } = req
    const shop = await Shop.query().findById(shopId).withGraphFetched("user")

    if (!shop) {
      return res.status(404).send({ error: "shop not found" })
    }

    res.send(shop)
  })
  // UPDATE
  app.put("/shop/:shopId", async (req, res) => {
    const {
      params: { shopId },
      body: { name, address, city, zipCode, picture, user_id },
    } = req

    const shop = await Shop.query()
      .updateAndFetchById(shopId, {
        name,
        address,
        city,
        zipCode,
        picture,
        user_id,
      })
      .withGraphFetched("user")

    res.send(film)
  })
  // DELETE
  app.delete("/shop/:shopId", async (req, res) => {
    const {
      params: { shopId },
    } = req
    const shop = await Shop.query().findById(shopId)

    if (!shop) {
      return res.status(404).send({ error: "shop not found" })
    }

    await Shop.query().deleteById(shopId)

    res.send(shop)
  })
}

module.exports = shopRoute
