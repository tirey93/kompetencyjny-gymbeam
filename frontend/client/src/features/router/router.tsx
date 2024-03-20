import { createBrowserRouter } from "react-router-dom";

import { Root } from "../../Root";
import { RegistrationPage } from "../pages/Registration/Registration";
import { Routes } from "./Routes";

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <Root />,
        children: [
            {
                path: Routes.ROOT,
                element: <RegistrationPage />,
            },
        ],
    },
]);
