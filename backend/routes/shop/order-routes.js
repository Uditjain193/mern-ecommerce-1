const express=require("express");
const router=express.Router()
const {createorder, capturepayment, getallordersbyuser, getorderdetails}=require("../../controllers/shop/order-controller")
router.post("/create",createorder)
router.post("/capture",capturepayment)
router.get("/list/:userId",getallordersbyuser)
router.get("/details/:id",getorderdetails)
module.exports=router