import { createSlice } from "@reduxjs/toolkit"
import { getAllTrip } from "./thunk/trip.thunk"

const initialState:any={
    trips:[],
    searchResults: []
}

const tripSlice=createSlice({
    name:"trip",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{ 
        builder.addCase(getAllTrip.fulfilled,(state,action)=>{
            state.searchResults = action.payload;
        })
    }
}) 

export const{actions}=tripSlice
export default tripSlice.reducer