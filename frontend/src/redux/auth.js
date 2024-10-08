import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    isauth:false,
    isloading:true,
    user:null,
    token:null
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
// export const checkauth=createAsyncThunk("/auth/checkauth",
//     async()=>{
//         const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/check-auth`,
//             {
//                 withCredentials:true,
                
//             }
//         )
//         return response.data
//     }
// )
export const checkauth=createAsyncThunk("/auth/checkauth",
    async(token)=>{
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/check-auth`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Cache-control":"no-store,no-cache,must-revalidate,proxy-revalidate"
                }
                
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
        resettokenandcredentials:(state)=>{
            state.isauth=false;
            state.user=null
            state.token=null
        },
        setcheckauth:(state,action)=>{
            state.isloading = false;
            state.user = null;
            state.isauth = false;
        }
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
            state.token=action.payload.token
            sessionStorage.setItem('token',JSON.stringify(action.payload.token))
        })
        .addCase(loginuser.rejected,(state,action)=>{
            state.isloading=false
            state.user=null
            state.isauth=false
            state.token=null
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
export const {setuser,resettokenandcredentials,setcheckauth}=Authslice.actions
export default Authslice.reducer