import { axiosPrivate } from "../configHTTp"


export const getTripId=async()=>{
    return await axiosPrivate.get("/trip/trip-select/1026")
}