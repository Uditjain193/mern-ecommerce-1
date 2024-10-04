const Product = require("../../models/Product")
const searchproduct = async (req, res) => {
    try {
        const { keyword } = req.params
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be in string format"
            })
        }
        const regex = new RegExp(keyword, "i")
        const createsearchquery = {
            $or: [
                { title: regex },
                { description: regex },
                { category: regex },
                { brand: regex }
            ]
        }
        const searchresult = await Product.find(createsearchquery)
        res.status(200).json({
            success: true,
            data: searchresult
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
module.exports = { searchproduct }