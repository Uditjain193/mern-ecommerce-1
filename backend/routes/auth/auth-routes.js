const express=require("express")
const {registeruser,loginuser,logoutuser,authmiddleware}=require("../../controllers/auth/auth-controller")
const authrouter=express.Router()
authrouter.post("/register",registeruser)
authrouter.post("/login",loginuser)
authrouter.post("/logout",logoutuser)
authrouter.get("/check-auth",authmiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated user!!",
        user
    })
})
module.exports=authrouter