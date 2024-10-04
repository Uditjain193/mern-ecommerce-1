const mongoose=require("mongoose");
require("dotenv").config()
const dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB Connected Successfully"))
    .catch(()=>console.log("Error aa gya h"))
}
module.exports=dbconnect