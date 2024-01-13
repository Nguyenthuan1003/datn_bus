import { RouteObject } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard.component";
import UserAdminComponent from "./user/user-admin.component";
import BannerAdmin from "./banner/banner-admin.conponent";

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
    }

]