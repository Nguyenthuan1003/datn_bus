import { RouteObject } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard.component";
import BannerAdmin from "./banner/banner-admin.conponent";
import ParentLocaltion from "./parent-location/parent-location.component";
import LocaltionComponent from "./location/location.component";
import RouteComponent from "./route/route.component";

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
        path: 'banner',
        element: <BannerAdmin />,
        children: []
    },
    {
        path: 'parent-location',
        element: <ParentLocaltion />,
        children: []
    },
    {
        path: 'location',
        element: <LocaltionComponent />,
    },
    {
        path: 'route',
        element: <RouteComponent />,
        children: []
    },
    {
        path: 'car',
        element: <div><CarComponent /></div>,
        children: [],
    },
 

]