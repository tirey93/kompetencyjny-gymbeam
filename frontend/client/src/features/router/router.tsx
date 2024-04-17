import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AppProvider } from "../../AppProvider";
import { Root } from "../../Root";
import { NotFoundPage } from "../pages/404";
import { ActivitiesPage } from "../pages/Activities/ActivitiesPage";
import { ActivityPage } from "../pages/Activity/ActivityPage";
import { AdminDashboardPage } from "../pages/AdminDashboard";
import { RegistrationPage } from "../pages/Auth/Registration";
import { SignInPage } from "../pages/Auth/SignIn";
import { GymPassPage } from "../pages/GymPass";
import { HomePage } from "../pages/Home";
import { AppRoute } from "./AppRoute";

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
        path: AppRoute.ACTIVITY_DETAILS,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ActivityPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.ADMIN_DASHBOARD,
        element: (
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <AdminDashboardPage />
            </ProtectedRoute>
        ),
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
