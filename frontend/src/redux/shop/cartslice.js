import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    cartitems: [],
    isloading: false
}
export const addtocart = createAsyncThunk(
    "/cart/addtocart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shop/cart/add`, { userId, productId, quantity })
        return response.data
    }
)
export const fetchcartitem = createAsyncThunk(
    "/cart/fetchcartitem",
    async (userId) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/cart/get/${userId}`)
        return response.data
    }
)
export const deletecartitem = createAsyncThunk(
    "/cart/deletecartitem",
    async ({ userId, productId }) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/shop/cart/${userId}/${productId}`)
        return response.data
    }
)
export const updatecartquantity = createAsyncThunk(
    "/cart/updatecartquantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/shop/cart/updatecart`, { userId, productId, quantity })
        return response.data
    }
)
const shoppingcartslice = createSlice({
    name: "shoppingcart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addtocart.pending, (state) => {
            state.isloading = true
        })
            .addCase(addtocart.fulfilled, (state, action) => {
                state.isloading = false
                state.cartitems = action.payload.data
            })
            .addCase(addtocart.rejected, (state) => {
                state.isloading = false
                state.cartitems = []
            })
            .addCase(fetchcartitem.pending, (state) => {
                state.isloading = true
            })
            .addCase(fetchcartitem.fulfilled, (state, action) => {
                state.isloading = false
                state.cartitems = action.payload.data
            })
            .addCase(fetchcartitem.rejected, (state) => {
                state.isloading = false
                state.cartitems = []
            })
            .addCase(updatecartquantity.pending, (state) => {
                state.isloading = true
            })
            .addCase(updatecartquantity.fulfilled, (state, action) => {
                state.isloading = false
                state.cartitems = action.payload.data
            })
            .addCase(updatecartquantity.rejected, (state) => {
                state.isloading = false
                state.cartitems = []
            })
            .addCase(deletecartitem.pending, (state) => {
                state.isloading = true
            })
            .addCase(deletecartitem.fulfilled, (state, action) => {
                state.isloading = false
                state.cartitems = action.payload.data
            })
            .addCase(deletecartitem.rejected, (state) => {
                state.isloading = false
                state.cartitems = []
            })
    }
})
export default shoppingcartslice.reducer