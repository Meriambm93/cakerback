const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")
const config = require("./src/config")

const knexfile = require("./knexfile")
//Routes
const roleRoute = require("./src/routes/roleRoute")
const userRoute = require("./src/routes/userRoute")
const signingRoute = require("./src/routes/signingRoute")

const db = knex(knexfile)
const app = express()

Model.knex(db)

app.use(cors())
app.use(express.json())

roleRoute({ app, db })
//Creation user route
userRoute({ app, db })
signingRoute({ app, db })

app.listen(config.app.port)