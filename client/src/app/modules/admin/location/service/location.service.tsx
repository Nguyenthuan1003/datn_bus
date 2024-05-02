import { axiosPrivate, axiosFormData } from "~/app/api/confighHTTp"


export const getAllLocaltion = async () => {
    return await axiosPrivate.get("/locations")
}

export const deleteLocaltion = async (id: any) => {
    return await axiosPrivate.delete(`/locations/delete/${id}`)
}

export const addLocaltion = async (data: any) => {
    return await axiosFormData.post(`/locations/store`,data)
}

export const updateLocaltion = async (data: any, id: any) => {
    return await axiosFormData.post(`/locations/update/${id}?_method=PUT`, data)
}