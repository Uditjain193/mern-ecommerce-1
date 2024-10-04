import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading: false,
    searchresults: []
}
export const getsearchresults = createAsyncThunk("/orderrr",
    async (keyword) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/search/${keyword}`)
        return response.data
    }
)
const searchslice = createSlice({
    name: "searchslice",
    initialState,
    reducers: {
        resetsearchresults: (state) => {
            state.searchresults = []
    }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getsearchresults.pending, (state) => {
                state.isloading = true
            })
            .addCase(getsearchresults.fulfilled, (state, action) => {
                state.isloading = false
                state.searchresults = action.payload.data
            })
            .addCase(getsearchresults.rejected, (state) => {
                state.isloading = false
                state.searchresults = []
            })
    }
})
export const { resetsearchresults } = searchslice.actions
export default searchslice.reducer