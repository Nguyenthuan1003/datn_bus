import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllBill = async () => {
    return await axiosPrivate.get("/bill")
}

export const createBill = async (data:any) => {
    return await axiosPrivate.post("/bill/store",data)
}

export const deleteBill = async (id: any) => {
    return await axiosPrivate.delete(`/bill/delete/${id}`)
}

// export const addCar = async (data: any) => {
//     return await axiosPrivate.post(`/bill/store`,data)
// }

export const updateBill = async (data: any,id:any) => {
    return await axiosPrivate.put(`/bill/update/${id}`,data)
}