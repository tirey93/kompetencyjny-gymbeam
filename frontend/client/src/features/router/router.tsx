import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AppProvider } from "../../AppProvider";
import { Root } from "../../Root";
import { NotFoundPage } from "../pages/404";
import { ActivitiesPage } from "../pages/Activities/ActivitiesPage";
import { AdminDashboardPage } from "../pages/AdminDashboard";
import { RegistrationPage } from "../pages/Auth/Registration";
import { SignInPage } from "../pages/Auth/SignIn";
import { GymPassPage } from "../pages/GymPass";
import { HomePage } from "../pages/Home";
import { Routes } from "./Routes";

const APP_PAGES = [
    {
        path: Routes.ROOT,
        element: <HomePage />,
    },
    {
        path: Routes.REGISTRATION,
        element: (
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={Routes.ROOT}>
                <RegistrationPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.LOGIN,
        element: (
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={Routes.ROOT}>
                <SignInPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.GYM_PASS,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={Routes.LOGIN}>
                <GymPassPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.ACTIVITIES,
        element: (
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={Routes.LOGIN}>
                <ActivitiesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.ADMIN_DASHBOARD,
        element: (
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={Routes.LOGIN}>
                <AdminDashboardPage />
            </ProtectedRoute>
        ),
    },
];

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <AppProvider />,
        children: [
            {
                path: Routes.ROOT,
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
