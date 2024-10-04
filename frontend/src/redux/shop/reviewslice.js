import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading: false,
    reviews: []
}
export const addreview = createAsyncThunk("/adddddd", async (formdata) => {
    return axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/shop/review/add`, formdata)
    .then((response) => {
      console.log("Response:", response);
      return response.data;
    })
    .catch((error) => {
      // Log error details
      if (error.response) {
        console.log("Error Response:", error.response);
      } else {
        console.log("Error Message:", error.message);
      }
      // Throw the error so it's still handled by createAsyncThunk
      throw error;
    });
})
export const getreview = createAsyncThunk("/getttttt", async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/review/${id}`)
    return response.data
})
const reviewslice = createSlice({
    name: "reviewslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getreview.pending, (state) => {
                state.isloading = true
            })
            .addCase(getreview.fulfilled, (state, action) => {
                state.isloading = false
                state.reviews = action.payload.data
            })
            .addCase(getreview.rejected, (state) => {
                state.isloading = false;
                state.reviews = []
            })
    }
})
export default reviewslice.reducer