import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllParent = async () => {
    return await axiosPrivate.get("/parent-location")
}

export const deleteParent = async (id: any) => {
    return await axiosPrivate.delete(`/parent-location/delete/${id}`)
}

export const addParent = async (data: any) => {
    return await axiosPrivate.post(`/parent-location/store`,data)
}

export const updateParent = async (data: any,id:any) => {
    return await axiosPrivate.put(`/parent-location/update/${id}`,data)
}