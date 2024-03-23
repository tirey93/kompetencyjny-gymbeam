import { Outlet } from "react-router-dom";

import { ThemeProvider } from "./common/theme/ThemeProvider";

export const AppProvider = () => {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    );
};
