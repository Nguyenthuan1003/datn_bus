import { RouteObject } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard.component";
import BannerAdmin from "./banner/banner-admin.conponent";
import TypeCarComponent from "./type_car/typeCar.component";
import CarComponent from "./car/car.component";
export const adminRouter: RouteObject[] = [
    {
        path: '',
        element: <div><DashboardComponent /></div>,
        children: [],
    },
    {
        path: 'type-car',
        element: <div><TypeCarComponent /></div>,
        children: [],
    },
    {
        path: 'car',
        element: <div><CarComponent /></div>,
        children: [],
    },
 

]