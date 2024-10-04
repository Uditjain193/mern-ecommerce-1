const Cart = require("../../models/Cart")
const Product = require("../../models/Product")
const addtocart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!!!"
            })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        const findcurrentproductindex = cart.items.findIndex((item) => item.productId.toString() === productId)
        if (findcurrentproductindex === -1) {
            cart.items.push({ productId, quantity })
        }
        else {
            cart.items[findcurrentproductindex].quantity += quantity
        }
        await cart.save()
        res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
const fetchcartitems = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is mandatory!!!"
            })
        }
        const cart = await Cart.findOne({ userId }).populate('items.productId')
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
        const validitems = cart.items.filter((productitem) => productitem.productId)
        if (validitems.length < cart.items.length) {
            cart.items = validitems
            await cart.save()
        }
        const populatecartitems = validitems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            saleprice: item.productId.saleprice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart,
                items: populatecartitems,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
const updatecartitemqty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!!!"
            })
        }
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
        const findcurrentproductindex = cart.items.findIndex((item) => item.productId.toString() == productId)
        if (findcurrentproductindex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present!!!"
            })
        }
        cart.items[findcurrentproductindex].quantity = quantity
        await cart.save()
        await cart.populate("items.productId")
        const populatecartitems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            saleprice: item.productId ? item.productId.saleprice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart,
                items: populatecartitems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
const deletecartitems = async (req, res) => {
    try {
        const { userId, productId } = req.params
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const cart = await Cart.findOne({ userId }).populate("items.productId")
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
        cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId)
        await cart.save()
        await cart.populate("items.productId")
        const populatecartitems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            saleprice: item.productId ? item.productId.saleprice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart,
                items: populatecartitems,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}
module.exports = { addtocart, updatecartitemqty, deletecartitems, fetchcartitems }