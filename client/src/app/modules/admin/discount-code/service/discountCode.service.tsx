import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllDiscountCode = async () => {
    return await axiosPrivate.get("/discount-code")
}

export const deleteDiscountCode = async (id: any) => {
    return await axiosPrivate.delete(`/discount-code/delete/${id}`)
}

export const addDiscountCode = async (data: any) => {
    return await axiosPrivate.post(`/discount-code/store`,data)
}

export const updateDiscountCode = async (data: any,id:any) => {
    return await axiosPrivate.put(`/discount-code/update/${id}`,data)
}