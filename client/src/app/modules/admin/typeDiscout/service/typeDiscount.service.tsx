import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllTypeDiscountCode = async () => {
    return await axiosPrivate.get("/type-discount-code")
}

export const deleteTypeDiscountCode = async (id: any) => {
    return await axiosPrivate.delete(`/type-discount-code/delete/${id}`)
}

export const addTypeDiscountCode = async (data: any) => {
    return await axiosPrivate.post(`/type-discount-code/store`,data)
}

export const updateTypeDiscountCode = async (data: any,id:any) => {
    return await axiosPrivate.put(`/type-discount-code/update/${id}`,data)
}