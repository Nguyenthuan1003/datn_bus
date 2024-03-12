import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/confighHTTp";

export const getAllTrip=createAsyncThunk("trip/getAllTrip",async()=>{
    const response=await axiosPrivate.get("/trip")
    return response
})