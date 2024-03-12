import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllTypeCar = async () => {
    return await axiosPrivate.get("/type-car")
}

export const deleteTypeCar = async (id: any) => {
    return await axiosPrivate.delete(`/type-car/delete/${id}`)
}

export const addTypeCar = async (data: any) => {
    return await axiosPrivate.post(`/type-car/store`,data)
}

export const updateTypeCar = async (data: any,id:any) => {
    return await axiosPrivate.put(`/type-car/update/${id}`,data)
}