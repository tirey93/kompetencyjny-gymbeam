import {createBrowserRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Root} from "../../Root";
import {HomePage} from "../pages/Home/HomePage";

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <Root />,
        children: [
            {
                path: Routes.ROOT,
                element: <HomePage />
            }
        ]
    }
])
