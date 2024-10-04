const Product = require("../../models/Product")
const addproduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, saleprice, totalstock, averagereview } = req.body;
        const newproduct = await Product.create({ averagereview, image, title, description, category, brand, price, saleprice, totalstock })
        res.status(200).json({
            success: true,
            data: newproduct
        })
    }
    catch (e) {
        res.status(500).json({
            success: false
        })
    }
}
const fetchallproduct = async (req, res) => {
    try {
        const listofproducts = await Product.find({})
        res.status(200).json({
            success: true,
            data: listofproducts
        })
    }
    catch (e) {
        res.status(500).json({
            success: false
        })
    }
}
const editproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, averagereview, description, category, brand, price, saleprice, totalstock } = req.body
        let findproduct = await Product.findById(id)
        findproduct.title = title || findproduct.title
        findproduct.description = description || findproduct.description
        findproduct.category = category || findproduct.category
        findproduct.brand = brand || findproduct.brand
        findproduct.price = price === "" ? 0 : price || findproduct.price
        findproduct.saleprice = saleprice === "" ? 0 : saleprice || findproduct.saleprice
        findproduct.totalstock = totalstock || findproduct.totalstock
        findproduct.image = image || findproduct.image
        findproduct.averagereview = averagereview || findproduct.averagereview
        await findproduct.save();
        res.status(200).json({
            success: true,
            data: findproduct
        })
    }
    catch (e) {
        res.status(500).json({
            success: false
        })
    }
}
const deleteproduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true
        })
    }
    catch (e) {
        res.status(500).json({
            success: false
        })
    }
}
module.exports = { addproduct, fetchallproduct, editproduct, deleteproduct }