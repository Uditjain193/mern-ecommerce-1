const Address = require("../../models/Address")
const addaddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const newaddress = new Address({
            userId, address, city, pincode, notes, phone
        })
        await newaddress.save()
        res.status(200).json({
            success: true,
            data: newaddress
        })
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "Error"
        })
    }
}
const fetchaddress = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!!"
            })
        }
        const addresslist = await Address.find({ userId })
        res.status(200).json({
            success: true,
            data: addresslist
        })
    }
    catch (e) {
        res.staus(400).json({
            success: false,
            message: "Error"
        })
    }
}
const editaddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        const formdata = req.body
        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: "user and address id is required!!"
            })
        }
        const address = await Address.findOneAndUpdate({ _id: addressId, userId }, formdata, { new: true })
        if (!address) {
            res.status(404).json({
                successfalse,
                message: "Address not found"
            })
        }
        res.status(200).json({
            success: true,
            data: address
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
const deleteaddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        if (!userId || !addressId) {
            res.status(400).json({
                suucess: false,
                message: "User and Address id is required!!"
            })
        }
        const address = await Address.findOneAndDelete({ _id: addressId, userId })
        if (!address) {
            res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
module.exports = { addaddress, fetchaddress, editaddress, deleteaddress }