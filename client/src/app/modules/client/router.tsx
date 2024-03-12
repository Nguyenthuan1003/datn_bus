import { RouteObject } from "react-router-dom";
import HomeComponent from "./home/home.component";
import CheckTicketComponent from "./check-ticket/check-ticket.component";
import BooktickitsComponent from "./book-tickets/book-tickets.component";
import LoginComponent from "./login/login.component";
import RegisterComponent from "./register/register.component";
import BusSearchResults from "./bus-search-results/bus-search-results.component";
import RouteScheduleComponent from "./route-schedule/routeSchedule.component";
// import AboutComponent from "./about/about.component"
import AboutComponent from "./about/about.component"
import ContactComponent from "./contact/contact.component"
import ChangeComponent from "./change-pass/changePass.component";
import ForgotPassComponent from "./forgot-pass/forgot-pass.component"

export const clientRouter: RouteObject[] = [
    {
        path: "/",
        element: <HomeComponent />
    },
    {
        path: "/check-ticket",
        element: <CheckTicketComponent />
    },
    {
        path: "/book-tickets",
        element: <BooktickitsComponent />
    },
    {
        path: "/login",
        element: <LoginComponent />
    },
    {
        path: "/change-pass",
        element: <ChangeComponent />
    },
    {
        path: "/forgot-pass",
        element: <ForgotPassComponent />
    },
    {
        path: "/register",
        element: <RegisterComponent />
    },
    {
        path: "/about",
        element: <AboutComponent />
    },
    {
        path: "/contact",
        element: <ContactComponent />
    },
    {
        path: "/buy-search-results",
        element: <BusSearchResults />
    },
    {
        path: "/route-schedule",
        element: <RouteScheduleComponent />
    }
]