const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")
const config = require("./src/config")

const knexfile = require("./knexfile")
//Routes
const roleRoute = require("./src/routes/roleRoute")
const categoryRoute = require("./src/routes/categoryRoute")
const shopRoute = require("./src/routes/shopRoute")
const userRoute = require("./src/routes/userRoute")
const signingRoute = require("./src/routes/signingRoute")
const commentRoute = require("./src/routes/commentRoute")
const productRoute = require("./src/routes/productRoute")
const orderRoute = require("./src/routes/orderRoute")
const orderProductRoute = require("./src/routes/orderProductRoute")
const userProfilRoute = require("./src/routes/userProfilRoute")

const db = knex(knexfile)
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
productRoute({ app, db })
orderRoute({ app, db })
orderProductRoute({ app, db })
userProfilRoute({ app, db })
app.listen(config.app.port)
