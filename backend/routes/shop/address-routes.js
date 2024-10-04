const express = require("express")
const { fetchaddress, addaddress, editaddress, deleteaddress } = require("../../controllers/shop/address-controller")
const router = express.Router()
router.get("/get/:userId", fetchaddress)
router.post("/add", addaddress)
router.put("/update/:userId/:addressId", editaddress)
router.delete("/delete/:userId/:addressId", deleteaddress)
module.exports = router