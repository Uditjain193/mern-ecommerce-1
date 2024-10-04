const mongoose=require("mongoose")
const orderschema=new mongoose.Schema({
    userId:String,
    cartId:String,
    cartitems:[
        {
            productId:String,
            title: String,
            image:String,
            price:String,
            quantity:Number
        }
    ],
    addressinfo:{
        addressId:String,
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String
    },
    orderstatus:String,
    paymentmethod:String,
    paymentstatus:String,
    totalamount:Number,
    orderdate:Date,
    orderupdatedate:Date,
    paymentId:String,
    payerId:String
})
module.exports=mongoose.model("Order",orderschema)