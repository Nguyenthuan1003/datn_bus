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
import SuccessComponent from "./success/success.component";
import PaymentComponent from "./payment/payment.component";
import ResultPage from "./result/result_page";
import AccountInformation from "./account-information/account-information.component";
import TicketPurchaseHistory from "./ticket-purchase-history/ticket-purchase-history.component";
import ResetPassComponent from "./reset-pass/reset-pass.component";
import PaymentFailComponent from "./result/component/paymentFail.component";

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
        path: "/book-tickets/:id",
        element: <BooktickitsComponent />
    },
    {
        path: "/payment",
        element: <PaymentComponent />
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
    },
    {
        path: "/success",
        element: <SuccessComponent />
    },
    {
        path: "/result-payment",
        element: <ResultPage />
    },
    {
        path: "/account-information",
        element: <AccountInformation />
    },
    {
        path: "/ticket-purchase-history",
        element: <TicketPurchaseHistory />
    },
    {
        path: "/reset-pass",
        element: <ResetPassComponent />
    },
    {
        path: "/fail-payment",
        element: <PaymentFailComponent />
    },
]