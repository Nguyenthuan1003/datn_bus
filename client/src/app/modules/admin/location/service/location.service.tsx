import { axiosPrivate } from "~/app/api/configHTTP"


export const getAllLocaltion = async () => {
    return await axiosPrivate.get("/locations")
}

// export const deleteParent = async (id: any) => {
//     return await axiosPrivate.delete(`/parent-location/delete/${id}`)
// }

// export const addParent = async (data: any) => {
//     return await axiosPrivate.post(`/parent-location/store`,data)
// }

// export const updateParent = async (data: any,id:any) => {
//     return await axiosPrivate.put(`/parent-location/update/${id}`,data)
// }