import { RouteObject } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard.component";
import UserAdminComponent from "./user/user-admin.component";
import BannerAdmin from "./banner/banner-admin.conponent";
import TripComponent from "./trip/trip.component";

export const adminRouter: RouteObject[] = [
    {
        path: '',
        element: <div><DashboardComponent /></div>,
        children: [],
    },
    {
        path: 'user',
        element: <div><UserAdminComponent /></div>,
        children: [],
    },
    {
        path: 'banner',
        element: <BannerAdmin />,
        children: []
    },
    {
        path: 'trip',
        element: <TripComponent />,
        children: []
    }

]