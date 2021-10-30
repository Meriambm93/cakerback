const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")

const knexfile = require("./knexfile")
//Routes
const roleRoute = require("./src/routes/roleRoute")

const db = knex(knexfile)
const app = express()

Model.knex(db)

app.use(cors())
app.use(express.json())

roleRoute({ app, db })

app.listen(5000)
