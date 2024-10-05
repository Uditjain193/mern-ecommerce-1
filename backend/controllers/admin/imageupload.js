const cloudinary = require("cloudinary").v2
const FormData = require('form-data')
const fs=require("fs")
require("dotenv").config()
const axios=require("axios")
const imageupload = async (req, res) => {
    try {
        const image = req.files.file;
        
        // const formData = new FormData();
        // formData.append("file", fs.createReadStream(image.tempFilePath));
        // formData.append("upload_preset", "ecom");
        // formData.append("cloud_name", "djgxsrish");
        
        // const response = await axios.post(
        //     "https://api.cloudinary.com/v1_1/djgxsrish/image/upload",
        //     formData,
        //     {
        //         headers: formData.getHeaders()
        //     }
        // );

        // console.log(response.data);

        // res.status(200).json({
        //     success: true,
        //     response: response.data
        // });
        // console.log(process.env.CLOUD_NAME)
        // const image = req.files.file
        // console.log(process.env.CLOUD_NAME)
        // const instance = axios.create()
        // console.log(process.env.CLOUD_NAME)
        // const data = new FormData()
        // data.append("file", image);
        // data.append("upload_preset", "ecom");
        // data.append("cloud_name", "djgxsrish");
        
        // const response = await instance.post(
        //     `https://api.cloudinary.com/v1_1/djgxsrish/image/upload/`, 
        //     data
        // )
        // console.log(response)
        const options={folder:"success"}
        options.resource_type="auto"
        const response = await cloudinary.uploader.upload(image.tempFilePath, options)
        res.status(200).json({
            success: true,
            response
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            success: false,
            e:e
        })
    }
}
module.exports = { imageupload }