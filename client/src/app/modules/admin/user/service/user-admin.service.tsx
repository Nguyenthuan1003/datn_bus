import { axiosPrivate, axiosFormData } from "~/app/api/confighHTTp"


export const getAllUser = async () => {
    return await axiosPrivate.get("/user")
}

export const deleteUser = async (id: any) => {
    return await axiosPrivate.delete(`/user/delete/${id}`)
}

export const addUser = async (data: any) => {
    data.role_id = data.user_type_id;
    return await axiosFormData.post(`/user/store`,data)
}

export const updateUser = async (data: any,id:any) => {
    return await axiosFormData.put(`/user/update/${id}`,data)
}