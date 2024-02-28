import { axiosPrivate } from "~/app/api/configHTTP"


export const getAllRoute = async () => {
    return await axiosPrivate.get("/route")
}

export const deleteRoute = async (id: any) => {
    return await axiosPrivate.delete(`/route/delete/${id}`)
}

export const addRoute = async (data: any) => {
    return await axiosPrivate.post(`/route/store`,data)
}

export const updateRoute = async (data: any,id:any) => {
    return await axiosPrivate.put(`/route/update/${id}`,data)
}