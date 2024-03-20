import {createBrowserRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Root} from "../../Root";
import {RegistrationPage} from "../pages/Registration/Registration";

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <Root />,
        children: [
            {
                path: Routes.REGISTRATION,
                element: <RegistrationPage />
            }
        ]
    }
])
