const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../../models/User");


const registeruser=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const checkuser=await User.findOne({email});
        if (checkuser)
            return res.json({
              success: false,
              message: "User Already exists with the same email! Please try again",
            });
        const hashpassword = await bcrypt.hash(password, 12);
        const newuser = new User({
            username,
            email,
            password: hashpassword,
          });
          await newuser.save();
          res.status(200).json({
            success: true,
            message: "Registration successful",
          });
    }
    catch(e) {
        res.status(500).json({
          success: false,
          message: "Some error occured",
        });
      }
}
const loginuser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkpasswordmatch = await bcrypt.compare(
      password,
      checkuser.password
    );
    if (!checkpasswordmatch)
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
  
      const token = jwt.sign(
        {
          id: checkuser._id,
          role: checkuser.role,
          email: checkuser.email,
          username: checkuser.username,
        },
        "secretkey",
        { expiresIn: "60m" }
      );
      res.cookie("token", token, { httpOnly: true, secure: true }).json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkuser.email,
          role: checkuser.role,
          id: checkuser._id,
          username: checkuser.username,
        },
      });
    }catch (e) {
          res.status(500).json({
          success: false,
          message: "Some error occured",
        });
      }
}
const logoutuser = (req, res) => {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully!",
    });
};
const authmiddleware=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });
    }
    try{
        const decoded=jwt.verify(token,"secretkey")
        req.user=decoded
        next();
    }
    catch(error){
        res.status(401).json({
            success:false,
            message:"Unauthorised user!!"
        })
    }
}
module.exports={registeruser,loginuser,logoutuser,authmiddleware}