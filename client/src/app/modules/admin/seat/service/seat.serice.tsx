import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllSeat = async () => {
    return await axiosPrivate.get("/seats")
}

export const deleteSeat = async (id: any) => {
    return await axiosPrivate.delete(`/seats/delete/${id}`)
}

export const addSeat = async (data: any) => {
    return await axiosPrivate.post(`/seats/store`,data)
}

export const updateSeat = async (data: any,id:any) => {
    return await axiosPrivate.put(`/seats/update/${id}`,data)
}