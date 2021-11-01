const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")
const config = require("./src/config")
//Routes
const roleRoute = require("./src/routes/roleRoute")
const categoryRoute = require("./src/routes/categoryRoute")
const shopRoute = require("./src/routes/shopRoute")
const userRoute = require("./src/routes/userRoute")
const signingRoute = require("./src/routes/signingRoute")
const commentRoute = require("./src/routes/commentRoute")

const db = knex(config.db)
const app = express()

Model.knex(db)

app.use(cors())
app.use(express.json())

roleRoute({ app, db })
categoryRoute({ app, db })
shopRoute({ app, db })
//Creation user route
userRoute({ app, db })
signingRoute({ app, db })
commentRoute({ app, db })

app.listen(5000)
