const express = require("express")
const { addreview, getproductreview } = require("../../controllers/shop/review-controller")
const router = express.Router()
router.post("/add", addreview)
router.get("/:productId", getproductreview)
module.exports = router