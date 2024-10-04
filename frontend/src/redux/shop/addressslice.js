import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading: false,
    addresslist: []
}
export const addaddress = createAsyncThunk("/address/addaddress",
    async (formdata) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shop/address/add`, formdata)
        return response.data
    }
)
export const fetchaddress = createAsyncThunk("/address/fetchaddress",
    async (userId) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/address/get/${userId}`)
        return response.data
    })
export const editaddress = createAsyncThunk("/address/editaddress", async ({ userId, addressId, formdata }) => {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/shop/address/update/${userId}/${addressId}`, formdata)
    return response.data
})
export const deleteaddress = createAsyncThunk("/address/deleteaddress", async ({ userId, addressId }) => {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`)
    return response.data
})
const addressslice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addaddress.pending, (state) => {
                state.isloading = true
            })
            .addCase(addaddress.fulfilled, (state) => {
                state.isloading = false
            })
            .addCase(addaddress.rejected, (state) => {
                state.isloading = false
            })
            .addCase(fetchaddress.pending, (state) => {
                state.isloading = true
            })
            .addCase(fetchaddress.fulfilled, (state, action) => {
                state.isloading = false
                state.addresslist = action.payload.data
            })
            .addCase(fetchaddress.rejected, (state) => {
                state.isloading = false
                state.addresslist = []
            })
    }
})
export default addressslice.reducer