import { RouteObject } from "react-router-dom";
import HomeComponent from "./home/home.component";
import CheckTicketComponent from "./check-ticket/check-ticket.component";
import BooktickitsComponent from "./book-tickets/book-tickets.component";
import LoginComponent from "./login/login.component";
import RegisterComponent from "./register/register.component";
import BusSearchResults from "./bus-search-results/bus-search-results.component";
import AboutComponent from "./about/about.component"
import ContactComponent from "./contact/contact.component"

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
    }
]