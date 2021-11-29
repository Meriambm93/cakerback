const hashPassword = require("../hashPassword")
const User = require("../models/User")
const config = require("../config")
const validate = require("../middlewares/validate")
const emailValidator = require("../validators/emailValidator")
const passwordValidator = require("../validators/passwordValidator")
const uuid = require("uuid")

const signingRoute = ({ app, redis }) => {
  app.post(
    "/sign-up",
    validate({
      email: emailValidator(),
      password: passwordValidator(),
    }),
    async (req, res) => {
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
    },
  )
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
      const sessionId = uuid.v4()
      const { maxAge } = config.security.session

      await redis.setex(`sessionId:${sessionId}`, maxAge, user.id)

      res.cookie("sessionId", sessionId, {
        maxAge: maxAge * 1000,
        path: "/",
        domain: "localhost",
        httpOnly: true,
      })
      res.send({ status: "ok" })
    },
  )
  app.get("/session", async (req, res) => {
    const { sessionId } = req.cookies
    const userId = await redis.get(`sessionId:${sessionId}`)
    const user = await User.query().findById(userId)
    setTimeout(() => {
      if (!userId) {
        return res.send({ session: false })
      }

      res.send({ session: { userId, roleId: user.role_id } })
    }, 1500)
  })

  app.delete("/session", async (req, res) => {
    const { sessionId } = req.cookies

    await redis.del(`sessionId:${sessionId}`)
    res.send("Ok")
  })
}

module.exports = signingRoute
