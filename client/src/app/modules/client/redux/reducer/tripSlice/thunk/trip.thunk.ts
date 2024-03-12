import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHTTp";

export const getAllTrip=createAsyncThunk("trip/getAllTrip",async()=>{
    const response=await axiosPrivate.get("/trip")
    return response
})