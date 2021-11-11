const Ingredient = require("../models/Ingredient")

const ingredientRoute = ({ app }) => {
  // ingredient
  // CREATE
  app.post("/ingredient", async (req, res) => {
    const {
      body: { name, isHalal, isVegan, isOrganic },
    } = req

    const ingredient = await Ingredient.query().insertAndFetch({
      name,
      isHalal,
      isVegan,
      isOrganic,
    })

    res.send(ingredient)
  })
  // READ INDEX
  app.get("/ingredient", async (req, res) => {
    const ingredients = await Ingredient.query()

    res.send(ingredients)
  })
  // READ SINGLE
  app.get("/ingredient/:ingredientId", async (req, res) => {
    const {
      params: { ingredientId },
    } = req
    const ingredient = await Ingredient.query().findById(ingredientId)

    if (!ingredient) {
      return res.status(404).send({ error: "ingredient not found" })
    }

    res.send(ingredient)
  })
  // UPDATE
  app.put("/ingredient/:ingredientId", async (req, res) => {
    const {
      params: { ingredientId },
      body: { name, isHalal, isVegan, isOrganic },
    } = req

    const ingredient = await Ingredient.query().updateAndFetchById(
      ingredientId,
      {
        name,
        isHalal,
        isVegan,
        isOrganic,
      },
    )

    res.send(ingredient)
  })
  // DELETE
  app.delete("/ingredient/:ingredientId", async (req, res) => {
    const {
      params: { ingredientId },
    } = req
    const ingredient = await Ingredient.query().findById(ingredientId)

    if (!ingredient) {
      return res.status(404).send({ error: "ingredient not found" })
    }

    await Ingredient.query().deleteById(ingredientId)

    res.send(ingredient)
  })
}

module.exports = ingredientRoute
