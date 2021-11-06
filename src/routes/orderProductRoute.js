const OrderProduct = require("../models/OrderProduct")

const orderProductRoute = ({ app }) => {
  // orderProduct
  // CREATE
  app.post("/orderProduct", async (req, res) => {
    const {
      body: { product_id, order_id, quantity },
    } = req

    const orderProduct = await OrderProduct.query()
      .insertAndFetch({
        order_id,
        product_id,
        quantity,
      })
      .withGraphFetched("order")
      .withGraphFetched("product")

    res.send(orderProduct)
  })
  // READ INDEX
  app.get("/orderProduct", async (req, res) => {
    const ordersProducts = await OrderProduct.query()
      .withGraphFetched("order")
      .withGraphFetched("product")

    res.send(ordersProducts)
  })
}

module.exports = orderProductRoute
