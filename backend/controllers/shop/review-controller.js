const Order = require("../../models/Order")
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");
const addreview = async (req, res) => {
    try {
        const { productId, userId, username, reviewmessage, reviewvalue } = req.body
        const order = await Order.findOne({
            userId,
            "cartitems.productId": productId
        })
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it.",
            });
        }
        const existingreview = await ProductReview.findOne({ productId, userId })
        if (existingreview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }
        const newreview = new ProductReview({ productId, userId, username, reviewmessage, reviewvalue })
        await newreview.save()
        const review = await ProductReview.find({ productId })
        const totalreviewlength = review.length;
        const averagereview = review.reduce((sum, reviewitem) => sum + reviewitem.reviewvalue, 0) / totalreviewlength
        await Product.findByIdAndUpdate(productId, { averagereview })
        res.status(201).json({
            success: true,
            data: newreview
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
const getproductreview = async (req, res) => {
    try {
        const { productId } = req.params
        const review = await ProductReview.find({ productId })
        res.status(200).json({
            success: true,
            data: review
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
module.exports = { addreview, getproductreview }