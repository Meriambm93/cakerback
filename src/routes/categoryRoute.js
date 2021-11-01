const Category = require("../models/Category")

const categoryRoute = ({ app }) => {
  // category
  // CREATE
  app.post("/category", async (req, res) => {
    const {
      body: { name },
    } = req

    const category = await Category.query().insertAndFetch({
      name,
    })

    res.send(category)
  })
  // READ INDEX
  app.get("/category", async (req, res) => {
    const categories = await Category.query()

    res.send(categories)
  })
  // READ SINGLE
  app.get("/category/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
    } = req
    const category = await Category.query().findById(categoryId)

    if (!category) {
      return res.status(404).send({ error: "category not found" })
    }

    res.send(category)
  })
  // UPDATE
  app.put("/category/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
      body: { name },
    } = req

    const category = await Category.query().updateAndFetchById(categoryId, {
      name,
    })

    res.send(category)
  })
  // DELETE
  app.delete("/category/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
    } = req
    const category = await Category.query().findById(categoryId)

    if (!category) {
      return res.status(404).send({ error: "category not found" })
    }

    await Category.query().deleteById(categoryId)

    res.send(category)
  })
}

module.exports = categoryRoute
