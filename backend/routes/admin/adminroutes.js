const express=require("express")
const { imageupload } = require("../../controllers/admin/imageupload")
const adminrouter=express.Router()
adminrouter.post("/imageupload",imageupload)
module.exports=adminrouter