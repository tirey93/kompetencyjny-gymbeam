import { Outlet } from "react-router-dom";

import { AppOverlay } from "./common/components/AppOverlay/AppOverlay";
import { ThemeProvider } from "./common/theme/ThemeProvider";
import { NavigationShell } from "./features/navigation/Shell/Shell";
import { useRedirect } from "./features/router/hooks/useRedirect";
import { Routes } from "./features/router/Routes";

export const Root = () => {
    useRedirect(Routes.LOGIN, window.location.pathname === Routes.ROOT);

    return (
        <ThemeProvider>
            <NavigationShell>
                <AppOverlay />
                <Outlet />
            </NavigationShell>
        </ThemeProvider>
    );
};
