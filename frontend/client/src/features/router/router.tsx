import { createBrowserRouter } from "react-router-dom";

import { Root } from "../../Root";
import { RegistrationPage } from "../pages/Auth/Registration/Registration";
import { SignInPage } from "../pages/Auth/SignIn/SignIn";
import { Routes } from "./Routes";

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <Root />,
        children: [
            {
                path: Routes.REGISTRATION,
                element: <RegistrationPage />,
            },
            {
                path: Routes.LOGIN,
                element: <SignInPage />,
            },
        ],
    },
]);
