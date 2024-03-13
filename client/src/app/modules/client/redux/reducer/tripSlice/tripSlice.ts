import { createSlice } from "@reduxjs/toolkit"
import { getAllTrip } from "./thunk/trip.thunk"


const initialState:any={
    trips:[]
}

const tripSlice=createSlice({
    name:"trip",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllTrip.fulfilled,(state:any,action:any)=>{
            state.trips=action.payload;
        })
    }

})

export const{actions}=tripSlice
export default tripSlice.reducer