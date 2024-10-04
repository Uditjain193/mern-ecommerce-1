import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading: false,
    orderlist: [],
    orderdetails: null
}
export const getallordersforadmin = createAsyncThunk("/order/get/getforadmin",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/orders/get`)
        return response.data
    }
)
export const getorderdetailsforadmin = createAsyncThunk("/order/getdetailsforadmin",
    async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/orders/details/${id}`)
        return response.data
    }
)
export const updateorderstatus = createAsyncThunk("/order/updateorderstatus",
    async ({ id, orderstatus }) => {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/orders/update/${id}`, { orderstatus })
        return response.data
    }
)
const adminorderslice = createSlice({
    name: "adminorderslice",
    initialState,
    reducers: {
        resetorderdetails: (state) => {
            state.orderdetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getallordersforadmin.pending, (state) => {
                state.isloading = true
            })
            .addCase(getallordersforadmin.fulfilled, (state, action) => {
                state.isloading = false
                state.orderlist = action.payload.data
            })
            .addCase(getallordersforadmin.rejected, (state) => {
                state.isloading = false
                state.orderlist = []
            })
            .addCase(getorderdetailsforadmin.pending, (state) => {
                state.isloading = true
            })
            .addCase(getorderdetailsforadmin.fulfilled, (state, action) => {
                state.isloading = false
                state.orderdetails = action.payload.data
            })
            .addCase(getorderdetailsforadmin.rejected, (state) => {
                state.isloading = false
                state.orderdetails = null
            })
    }
})
export const { resetorderdetails } = adminorderslice.actions
export default adminorderslice.reducer