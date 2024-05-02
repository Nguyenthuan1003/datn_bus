import { axiosPrivate } from "~/app/api/confighHTTp"

export const getTrip = async () => {
    return await axiosPrivate.get("/trip")
}

export const getStatisticalGeneral = async () => {
    return await axiosPrivate.get("/statistical/general")
}

export const getSatisticalRoute = async () => {
    return await axiosPrivate.get(`/statistical/route/`)
}

export const getDataChartRoute = async (value:any) => {
    return await axiosPrivate.get(`/statistical/route-for-year`,value)
}

export const getDataChartTrip = async () => {
    return await axiosPrivate.put(`/statistical/revenue-trip-year/`)
}
export const getDataHome = async () => {
    return await axiosPrivate.get(`/statistical/home`)
}