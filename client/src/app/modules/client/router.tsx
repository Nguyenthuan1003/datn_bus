import { RouteObject } from "react-router-dom";
import HomeComponent from "./home/home.component";


export const clientRouter: RouteObject[] = [
    {
        path: "/",
        element: <HomeComponent />
    }
]