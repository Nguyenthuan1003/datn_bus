import { axiosPrivate, axiosFormData } from "~/app/api/confighHTTp"


export const getAllCar = async () => {
    return await axiosPrivate.get("/cars")
}

export const deleteCar = async (id: any) => {
    return await axiosPrivate.delete(`/cars/delete/${id}`)
}

export const addCar = async (data: any) => {
    return await axiosFormData.post(`/cars/store`,data)
}

export const updateCar = async (data: any,id:any) => {
    return await axiosFormData.post(`/cars/update/${id}?_method=PUT`,data)
}