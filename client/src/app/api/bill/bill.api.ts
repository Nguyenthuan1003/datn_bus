import { axiosPrivate } from "../configHTTp"

export const addBill=async(data:any)=>{
    return await axiosPrivate.post("/bill/store",data)
}