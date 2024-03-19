import { axiosPrivate } from "../confighHTTp"

export const addBill = async (data: any) => {
    // return await axiosPrivate.post("/bill/store", data)
   const response = await axiosPrivate.post("/bill/store", data)
        if(response){
            localStorage.setItem('bill_user', JSON.stringify([response?.data?.bill]));
        }
   return response
}
export const paymentVNP = async (data: any) => {
    return await axiosPrivate.post("/payment", data)
}