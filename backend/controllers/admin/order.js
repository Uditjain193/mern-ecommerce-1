const Order = require("../../models/Order")
const getallorderofallusers = async (req, res) => {
    try {
        const orders = await Order.find({})
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No Orders found!!"
            })
        }
        res.status(200).json({
            success: true,
            data: orders
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}
const getorderdetailsforadmin = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Orders not found"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}
const updateorderstatus = async (req, res) => {
    try {
        const { id } = req.params
        const { orderstatus } = req.body;
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!!"
            })
        }
        await Order.findByIdAndUpdate(id, { orderstatus })
        res.status(200).json({
            success: true,
            message: "Order status is updated successfully!",
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}
module.exports = { getallorderofallusers, getorderdetailsforadmin, updateorderstatus }