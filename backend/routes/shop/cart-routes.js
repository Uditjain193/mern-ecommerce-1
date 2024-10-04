const express = require("express")
const { addtocart, fetchcartitems, updatecartitemqty, deletecartitems } = require("../../controllers/shop/cart-controller")
const router = express.Router()
router.post("/add", addtocart)
router.get("/get/:userId", fetchcartitems)
router.put("/updatecart", updatecartitemqty)
router.delete("/:userId/:productId", deletecartitems)
module.exports = router