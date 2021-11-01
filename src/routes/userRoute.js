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
}
module.exports = userRoute
