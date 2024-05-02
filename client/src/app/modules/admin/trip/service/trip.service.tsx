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
export const getTripStatistical = async (startTime: string, endDate: string) => {
    const queryString = `start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endDate)}`;
    const url = `/trip/statistical/?${queryString}`;
 
    return await axiosPrivate.get(url);
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
export const getDetailTripByid = async (id:any) =>{
    return await axiosPrivate.get(`/trip/trip-detail/${id}`)
}
