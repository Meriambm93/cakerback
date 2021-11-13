const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")
const config = require("./src/config")
const cookieParser = require('cookie-parser')
const Redis = require('ioredis')

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
const ingredientRoute = require("./src/routes/ingredientRoute")
const productCategoryRoute = require("./src/routes/productCategoryRoute")
const productIngredientRoute = require("./src/routes/productIngredientRoute")

const db = knex(knexfile)
const app = express()
const redis = new Redis()

Model.knex(db)

app.use(cors())
app.use(cookieParser())
app.use(express.json())

roleRoute({ app, db, redis })
categoryRoute({ app, db, redis })
shopRoute({ app, db, redis })
//Creation user route
userRoute({ app, db, redis })
signingRoute({ app, db, redis })
commentRoute({ app, db, redis })
productRoute({ app, db, redis })
orderRoute({ app, db, redis })
orderProductRoute({ app, db, redis })
userProfilRoute({ app, db, redis })
ingredientRoute({ app, db, redis })
productCategoryRoute({ app, db, redis })
productIngredientRoute({ app, db, redis })
app.listen(config.app.port)
