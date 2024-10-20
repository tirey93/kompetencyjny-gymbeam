import { createBrowserRouter } from "react-router-dom";

import { NotFoundPage } from "@/app/pages/404";
import { ActivitiesPage } from "@/app/pages/Activities";
import { ActivitiesDashboardPage } from "@/app/pages/ActivitiesDashboard";
import { GymPassPage } from "@/app/pages/GymPass";
import { HomePage } from "@/app/pages/Home";
import { LegalPage } from "@/app/pages/Legal/LegalPage";
import { RegistrationPage } from "@/app/pages/Registration";
import { ReservationsPage } from "@/app/pages/Reservations";
import { SignInPage } from "@/app/pages/SignIn";
import { UsersDashboardPage } from "@/app/pages/UsersDashboard";
import { AppRoute } from "@/app/router/AppRoute";
import { ProtectedRoute } from "@/app/router/components/ProtectedRoute";
import { AppProvider } from "@/AppProvider";
import { Root } from "@/Root";

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
