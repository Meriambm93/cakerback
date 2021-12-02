const express = require("express")
const knex = require("knex")
const cors = require("cors")
const { Model } = require("objection")
const cookieParser = require("cookie-parser")
const Redis = require("ioredis")
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
const ingredientRoute = require("./src/routes/ingredientRoute")
const productCategoryRoute = require("./src/routes/productCategoryRoute")
const productIngredientRoute = require("./src/routes/productIngredientRoute")
const fileUpload = require("express-fileupload")

const db = knex(knexfile)
const app = express()

Model.knex(db)
const redis = new Redis()

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
)
app.use((req, res, next) => {
  req.redis = redis
  next()
})

roleRoute({ app, db })
categoryRoute({ app, db })
shopRoute({ app, db })
//Creation user route
userRoute({ app, db })
signingRoute({ app, db, redis })
commentRoute({ app, db })
productRoute({ app, db })
orderRoute({ app, db })
orderProductRoute({ app, db })
userProfilRoute({ app, db, redis })
ingredientRoute({ app, db })
productCategoryRoute({ app, db })
productIngredientRoute({ app, db })
app.listen(config.app.port)
