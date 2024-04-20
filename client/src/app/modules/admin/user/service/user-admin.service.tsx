import { axiosPrivate } from "../../../../api/configHTTP"


export const getAllUser = async () => {
    return await axiosPrivate.get("/user")
}

export const deleteUser = async (id: any) => {
    return await axiosPrivate.delete(`/user/delete/${id}`)
}

export const addUser = async (data: any) => {
    
    return await axiosPrivate.post(`/user/store`,data)
}

export const updateUser = async (data: any,id:any) => {
    return await axiosPrivate.put(`/user/update/${id}`,data)
}