import { axiosPrivate } from "../../../../api/configHTTP"


export const getAllType = async () => {
    return await axiosPrivate.get("/type-user")
}

export const deleteType = async (id: any) => {
    return await axiosPrivate.delete(`/type-user/delete/${id}`)
}

export const addType = async (data: any) => {
    return await axiosPrivate.post(`/type-user/store`,data)
}

export const updateType = async (data: any,id:any) => {
    return await axiosPrivate.put(`/type-user/update/${id}`,data)
}