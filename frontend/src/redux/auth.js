import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    isauth:false,
    isloading:true,
    user:null
}
export const registeruser=createAsyncThunk("/auth/register",
    async(formdata)=>{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`,
            formdata,
            {
                withCredentials:true
            } 
        )
        return response.data
    }
)
export const loginuser=createAsyncThunk("/auth/login",
    async(formdata)=>{        
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`,formdata,
            {
                withCredentials:true
            }
        )
        return response.data
    }
)
export const logout=createAsyncThunk("/auth/logout",
    async()=>{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`,{},
            {
                withCredentials:true
            }
        )
        return response.data
    }
)
export const checkauth=createAsyncThunk("/auth/checkauth",
    async()=>{
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/check-auth`,
            {
                withCredentials:true,
                
            }
        )
        return response.data
    }
)
export const Authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setuser:(state,action)=>{},
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registeruser.pending,(state)=>{
            state.isloading=true
        })
        .addCase(registeruser.fulfilled,(state,action)=>{
            state.isloading=false;
            state.user=null
            state.isauth=false
        })
        .addCase(registeruser.rejected,(state,action)=>{
            state.isloading=false
            state.user=null
            state.isauth=false
        })
        .addCase(loginuser.pending,(state)=>{
            state.isloading=true
        })
        .addCase(loginuser.fulfilled,(state,action)=>{
            state.isloading=false
            state.user=action.payload.success?action.payload.user:null
            state.isauth=action.payload.success
        })
        .addCase(loginuser.rejected,(state,action)=>{
            state.isloading=false
            state.user=null
            state.isauth=false
        })
        .addCase(checkauth.pending, (state) => {
            state.isloading = true;
          })
          .addCase(checkauth.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isauth = action.payload.success;
          })
          .addCase(checkauth.rejected, (state, action) => {
            state.isloading = false;
            state.user = null;
            state.isauth = false;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = null;
            state.isauth = false;
          });
    }
})
export const {setuser}=Authslice.actions
export default Authslice.reducer