const express=require("express")
const { searchproduct } = require("../../controllers/shop/search-controller")
const router=express.Router()
router.get("/:keyword",searchproduct)
module.exports=router