import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    approvalURL:null,
    isloading:false,
    orderId:null,
    orderlist:[],
    orderdetails:null
}
export const createorder=createAsyncThunk("/order/createorder",async(orderdata)=>{
    const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shop/order/create`,orderdata)
    return response.data
})
export const capturepayment=createAsyncThunk("/order/capture",async({paymentId,payerId,orderId})=>{
    const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shop/order/capture`,{paymentId,payerId,orderId})
    return response.data
})
export const getallordersbyuserid=createAsyncThunk("/order/getall",async(userId)=>{
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/order/list/${userId}`)
    return response.data
})
export const getorderdetails=createAsyncThunk("/order/getorder",
    async(id)=>{
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/order/details/${id}`)
        return response.data
    }
)
const shoppingorderslice=createSlice({
    name:"shoppingorderslice",
    initialState,
    reducers:{
        resetorderdetailss:(state)=>{
            state.orderdetails=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createorder.pending,(state)=>{
            state.isloading=true
        })
        .addCase(createorder.fulfilled,(state,action)=>{
            state.isloading=false
            state.approvalURL=action.payload.approvalURL
            state.orderId=action.payload.orderId
            sessionStorage.setItem("currentorderid",JSON.stringify(action.payload.orderId))
        })
        .addCase(createorder.rejected,(state)=>{
            state.isloading=false
            state.approvalURL=null
            state.orderId=null
        })
        .addCase(getallordersbyuserid.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getallordersbyuserid.fulfilled,(state,action)=>{
            state.isloading=false
            state.orderlist=action.payload.data
        })
        .addCase(getallordersbyuserid.rejected,(state)=>{
            state.isloading=false
            state.orderlist=[]
        })
        .addCase(getorderdetails.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getorderdetails.fulfilled,(state,action)=>{
            state.isloading=false
            state.orderdetails=action.payload.data
        })
        .addCase(getorderdetails.rejected,(state)=>{
            state.isloading=false
            state.orderdetails=null
        })
    }
})
export const {resetorderdetailss}=shoppingorderslice.actions
export default shoppingorderslice.reducer