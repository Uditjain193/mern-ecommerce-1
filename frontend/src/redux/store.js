import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./auth";
import Adminproductslice from "./admin/productslice"
import shopingproductslice from "./shop/productslice"
import shoppingcartslice from "./shop/cartslice"
import addressslice from "./shop/addressslice";
import orderslice from "./shop/orderslice";
import adminorderslice from "./admin/orderslice"
import searchslice from "./shop/searchslice";
import reviewslice from "./shop/reviewslice";
const store = configureStore({
    reducer: {
        auth: Authslice,
        adminproducts: Adminproductslice,
        adminorder: adminorderslice,
        shopproducts: shopingproductslice,
        shopcart: shoppingcartslice,
        shopaddress: addressslice,
        shoporder: orderslice,
        shopsearch: searchslice,
        shopreview: reviewslice
    }
})

export default store