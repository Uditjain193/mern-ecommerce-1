const express=require("express")
const shoppingproductrouter=express.Router()
const {fetchfiltereddata,fetchproductbyid}=require("../../controllers/shop/product-controller")
shoppingproductrouter.get("/get",fetchfiltereddata)
shoppingproductrouter.get("/get/:id",fetchproductbyid)
module.exports=shoppingproductrouter