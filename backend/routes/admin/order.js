const express=require("express")
const { getallorderofallusers, getorderdetailsforadmin, updateorderstatus } = require("../../controllers/admin/order")
const router=express.Router()
router.get("/get",getallorderofallusers)
router.get("/details/:id",getorderdetailsforadmin)
router.put("/update/:id",updateorderstatus)
module.exports=router