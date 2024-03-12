import { axiosPrivate } from "../confighHTTp"


export const getAllTrip=async()=>{
    return await axiosPrivate.get("trip")
}