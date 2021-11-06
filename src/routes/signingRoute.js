const hashPassword = require("../hashPassword")
const User = require("../models/User")
const config = require("../config")
const validate = require("../middlewares/validate")
const emailValidator = require("../validators/emailValidator")
const passwordValidator = require("../validators/passwordValidator")

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
  app.post(
    "/sign-in",
    validate({
      email: emailValidator(),
      password: passwordValidator(),
    }),
    async (req, res) => {
      const {
        body: { email, password },
      } = req

      const user = await User.query().findOne({ email })

      if (!user) {
        return res.status(403).send({
          error: "invalid",
        })
      }

      const { hash } = hashPassword(password, user.passwordSalt)

      if (user.passwordHash !== hash) {
        return res.status(403).send({ error: "invalid" })
      }
      res.send({ status: "ok" })
    },
  )
}
module.exports = signingRoute
