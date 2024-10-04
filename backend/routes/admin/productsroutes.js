const express=require("express")
const { addproduct, editproduct, deleteproduct, fetchallproduct } = require("../../controllers/admin/product")
const productrouter=express.Router()
productrouter.post("/add",addproduct)
productrouter.put("/edit/:id",editproduct)
productrouter.delete("/delete/:id",deleteproduct)
productrouter.get("/get",fetchallproduct)
module.exports=productrouter