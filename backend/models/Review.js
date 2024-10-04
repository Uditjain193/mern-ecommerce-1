const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
    {
        productId: String,
        userId: String,
        username: String,
        reviewmessage: String,
        reviewvalue: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema);