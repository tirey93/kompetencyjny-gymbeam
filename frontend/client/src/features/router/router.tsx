import { createBrowserRouter } from "react-router-dom";

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
        element: <RegistrationPage />,
    },
    {
        path: Routes.LOGIN,
        element: <SignInPage />,
    },
    {
        path: Routes.GYM_PASS,
        element: <GymPassPage />,
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
