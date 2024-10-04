import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isloading:false,
    productlist:[]
}
export const addnewproduct=createAsyncThunk("/products/addnewproduct",
    async(formdata)=>{
        const result=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/product/add`,formdata,
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        return result?.data
    }
)
export const fetchallproducts=createAsyncThunk("/product/fetchallproduct",
    async()=>{
        const result=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/product/get`)
        return result?.data
    }
)
export const editproduct=createAsyncThunk("/product/editproduct",
    async({id,formdata})=>{
        const result=await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/product/edit/${id}`,formdata,
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        return result?.data;
    }
)
export const deleteproduct=createAsyncThunk("/product/deleteproduct",
    async(id)=>{
        const result= await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/product/delete/${id}`)
        return result?.data
    }
)
const Adminproductslice=createSlice({
    name:"adminproducts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchallproducts.pending,(state)=>{
            state.isloading=true
        })
        .addCase(fetchallproducts.fulfilled,(state,action)=>{
            state.isloading=false
            state.productlist=action.payload.data
        })
        .addCase(fetchallproducts.rejected,(state,action)=>{
            state.isloading=false
            state.productlist=[]
        })
    }
})
export default Adminproductslice.reducer