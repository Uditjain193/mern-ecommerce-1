import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isloading:false,
    productlist:[],
    productdetails:null
}
export const fetchallfilteredproduct=createAsyncThunk(
    "/product/fetchallproduct",
    async({filterparams,sortparams})=>{
        const query=new URLSearchParams({...filterparams,sortby:sortparams})
        const result=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shop/product/get?${query}`)
        return result?.data
    }
)
export const fetchproductdetails=createAsyncThunk(
    "/products/fetchproductdetails",
    async(id)=>{
        const result=await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/shop/product/get/${id}`
        )
        return result?.data
    }
)
const shopingproductslice=createSlice({
    name:"shoppingproduct",
    initialState,
    reducers:{
        setproductdetails:(state)=>{
            state.productdetails=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchallfilteredproduct.pending,(state,action)=>{
            state.isloading=true
        })
        .addCase(fetchallfilteredproduct.fulfilled,(state,action)=>{
            state.isloading=false
            state.productlist=action.payload.data
        })
        .addCase(fetchallfilteredproduct.rejected,(state,action)=>{
            state.isloading=false
            state.productlist=[]
        })
        .addCase(fetchproductdetails.pending,(state,action)=>{
            state.isloading=true
        }) 
        .addCase(fetchproductdetails.fulfilled,(state,action)=>{
            state.isloading=false
            state.productdetails=action.payload.data
        })
        .addCase(fetchproductdetails.rejected,(state,action)=>[
            state.isloading=false,
            state.productdetails=null
        ])
    }
})
export const {setproductdetails}=shopingproductslice.actions
export default shopingproductslice.reducer