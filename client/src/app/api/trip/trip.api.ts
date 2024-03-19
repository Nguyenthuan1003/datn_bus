import { axiosPrivate } from "../confighHTTp"


export const getTripId=async(id:number)=>{
    return await axiosPrivate.get(`/trip/trip-select/${id}`)
}