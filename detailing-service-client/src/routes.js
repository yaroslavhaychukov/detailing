import Administrator from "./pages/Administrator";
import Auth from "./pages/Auth";
import FAQPage from "./pages/FAQPage";
import { FAQ_ROUTE, ADMINISTRATOR_ROUTE, EMPLOYEES_ROUTE, APPOINTMENTS_ROUTE, SERVICES_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, SERVICE_ROUTE, REGISTRATION_ROUTE, USERPROFILE_ROUTE } from "./utils/consts";
import ServicePage from "./pages/ServicePage";
import UserProfile from "./pages/UserProfile";
import ServicesPage from "./pages/ServicesPage";
import MainPage from "./pages/MainPage";
import EmployeesManagement from "./pages/EmployeesManagement";
import AppointmentsManagement from "./pages/AppointmentsManagement";

export const authRoutes = [
    {
        path: ADMINISTRATOR_ROUTE,
        Component: Administrator
    },
    {
        path: USERPROFILE_ROUTE,
        Component: UserProfile
    },
    {
        path: EMPLOYEES_ROUTE,
        Component: EmployeesManagement
    },
    {
        path: APPOINTMENTS_ROUTE,
        Component: AppointmentsManagement
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: FAQ_ROUTE,
        Component: FAQPage
    },
    {
        path: SERVICES_ROUTE,
        Component: ServicesPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SERVICE_ROUTE + '/:id',
        Component: ServicePage
    },
];