const Order = require("../models/Order")

const orderRoute = ({ app }) => {
  // order
  // CREATE
  app.post("/order", async (req, res) => {
    const {
      body: { user_id, shop_id },
    } = req

    const order = await Order.query()
      .insertAndFetch({
        user_id,
        shop_id,
      })
      .withGraphFetched("user")
      .withGraphFetched("shop")

    res.send(order)
  })
  // READ INDEX
  app.get("/order", async (req, res) => {
    const orders = await Order.query().withGraphFetched("user")

    res.send(orders)
  })
  // READ SINGLE
  app.get("/order/:orderId", async (req, res) => {
    const {
      params: { orderId },
    } = req
    const order = await Order.query().findById(orderId).withGraphFetched("user")

    if (!order) {
      return res.status(404).send({ error: "order not found" })
    }

    res.send(order)
  })
  // DELETE
  app.delete("/order/:orderId", async (req, res) => {
    const {
      params: { orderId },
    } = req
    const order = await Order.query().findById(orderId)

    if (!order) {
      return res.status(404).send({ error: "order not found" })
    }

    await Order.query().deleteById(orderId)

    res.send(order)
  })
}

module.exports = orderRoute
