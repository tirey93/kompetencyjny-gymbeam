import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AppProvider } from "../../AppProvider";
import { Root } from "../../Root";
import { NotFoundPage } from "../pages/404/404";
import { RegistrationPage } from "../pages/Auth/Registration/Registration";
import { SignInPage } from "../pages/Auth/SignIn/SignIn";
import { GymPassPage } from "../pages/GymPass/GymPass";
import { HomePage } from "../pages/Home/Home";
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
