import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppProvider } from "../../AppProvider";
import { Root } from "../../Root";
import { NotFoundPage } from "../pages/404";
import { ActivitiesPage } from "../pages/Activities";
import { ActivitiesDashboardPage } from "../pages/ActivitiesDashboard";
import { GymPassPage } from "../pages/GymPass";
import { HomePage } from "../pages/Home";
import { RegistrationPage } from "../pages/Registration";
import { ReservationsPage } from "../pages/Reservations/ReservationsPage";
import { SignInPage } from "../pages/SignIn";
import { UsersDashboardPage } from "../pages/UsersDashboard";
import { AppRoute } from "./AppRoute";
import {LegalPage} from "../pages/Legal/LegalPage";

const APP_PAGES = [
    {
        path: AppRoute.ROOT,
        element: <HomePage />,
    },
    {
        path: AppRoute.REGISTRATION,
        element: (
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={AppRoute.ROOT}>
                <RegistrationPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.LOGIN,
        element: (
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={AppRoute.ROOT}>
                <SignInPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.GYM_PASS,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <GymPassPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.ACTIVITIES,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ActivitiesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.USERS_DASHBOARD,
        element: (
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <UsersDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.ACTIVITIES_DASHBOARD,
        element: (
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ActivitiesDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.RESERVATIONS,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ReservationsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.LEGAL,
        element: <LegalPage />,
    },
];

export const router = createBrowserRouter([
    {
        path: AppRoute.ROOT,
        element: <AppProvider />,
        children: [
            {
                path: AppRoute.ROOT,
                element: <Root />,
                children: APP_PAGES,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
