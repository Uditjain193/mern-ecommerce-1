const cloudinary = require("cloudinary").v2
const imageupload=async(req,res)=>{
    try{
        const image=req.files.file
        const response=await cloudinary.uploader.upload(image.tempFilePath,{folder:"success"})
        res.status(200).json({
            success:true,
            response
        })
    }
    catch(e){
        res.json({
            success:false
        })
    }
}
module.exports={imageupload}