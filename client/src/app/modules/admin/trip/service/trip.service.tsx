import { axiosPrivate } from "~/app/api/confighHTTp"


export const getAllTrip = async () => {
    return await axiosPrivate.get("/trip")
}
export const getCarTrip = async () => {
    return await axiosPrivate.get("/trip/create")
}
export const getRouteTrip = async () => {
    return await axiosPrivate.get("/trip/create")
}
export const getLocationForRoute = async (id:any) => {
 
    return await axiosPrivate.get(`/trip/locations-for-route/${id}`)
}

// const addTripsToDB = (data) => {
//     return axiosPrivate.post('/trip', data);
// };

// export const createNewTrip = ({ name, startDate, endDate }) => {
//     let tripData = {
//         name: name,
//         departure_date: startDate,
//         arrival_date: endDate
//     };
//     console.log(tripData);
//     //return addTripsToDB(tripData).then((res) => res.data);
// };
export const deleteTrip = async (id: any) => {
    return await axiosPrivate.delete(`/trip/delete/${id}`)
}

export const addTrip = async (data: any) => {
    return await axiosPrivate.post(`/trip/store`,data)
}

export const updateTrip = async (data: any,id:any) => {
    return await axiosPrivate.put(`/trip/update/${id}`,data)
}

