const hashPassword = require("../hashPassword")
const User = require("../models/User")
const config = require("../config")

const signingRoute = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: {
        firstName,
        lastName,
        email,
        password,
        address,
        city,
        zipCode,
        role_id,
      },
    } = req
    const { hash, salt } = hashPassword(password)
    const user = await User.query()
      .insertAndFetch({
        firstName,
        lastName,
        email,
        passwordHash: hash,
        passwordSalt: salt,
        address,
        city,
        zipCode,
        role_id,
      })
      .withGraphFetched("role")
    res.send({ status: "success" })
  })
}
module.exports = signingRoute
