const User = require("../models/User")
const userRoute = ({ app }) => {
  //GET / :id
  app.get("/user/:id", async (req, res) => {
    const {
      params: { id },
    } = req
    const oneUser = await User.query().findById(id)
    if (!oneUser) {
      return res.status(404).res({ error: "user not found" })
    }
    res.send(oneUser)
  })

  //GET ALL USER/
  app.get("/users/", async (req, res) => {
    const {} = req
    const users = await User.query()
    if (!users) {
      return res.status(404).res({ error: "users not found" })
    }
    res.send(users)
  })
  // DELETE
  app.delete("/user/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req
    const user = await User.query().findById(userId)

    if (!user) {
      return res.status(404).send({ error: "user not found" })
    }

    await User.query().deleteById(userId)

    res.send(user)
  })
}
module.exports = userRoute
