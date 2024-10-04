require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const cookieparser = require("cookie-parser")
const fileupload = require("express-fileupload")

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/temp/"
}))
app.use(express.json())
const authrouter = require("./routes/auth/auth-routes")
const adminrouter = require("./routes/admin/adminroutes")
const productrouter = require("./routes/admin/productsroutes")
const shoppingproductrouter = require("./routes/shop/shoppingproductroutes")
const shopcartrouter = require("./routes/shop/cart-routes")
const shopaddressrouter = require("./routes/shop/address-routes")
const shoporderrouter = require("./routes/shop/order-routes")
const adminorderrouter = require("./routes/admin/order")
const searchrouter = require("./routes/shop/search-routes")
const reviewrouter = require("./routes/shop/review-routes")
app.use("/api/shop/review", reviewrouter)
app.use("/api/shop/search", searchrouter)
app.use("/api/admin/orders", adminorderrouter)
app.use("/api/shop/order", shoporderrouter)
app.use("/api/shop/address", shopaddressrouter)
app.use("/api/shop/cart", shopcartrouter)
app.use("/api/shop/product", shoppingproductrouter)
app.use("/api/admin/product", productrouter)
app.use("/api/admin", adminrouter)
app.use("/api/auth", authrouter)
const PORT = process.env.PORT || 4000
const dbconnect = require("./config/database")
dbconnect()
const cloudinaryconnect = require("./config/cloudinary")
cloudinaryconnect()
app.listen(PORT, () => {
  console.log(`App started successfully at ${PORT}`)
})