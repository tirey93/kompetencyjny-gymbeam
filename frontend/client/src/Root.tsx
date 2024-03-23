import { Outlet } from "react-router-dom";

import { AppOverlay } from "./common/components/AppOverlay/AppOverlay";
import { NavigationShell } from "./features/navigation/Shell/Shell";
import { useRedirect } from "./features/router/hooks/useRedirect";
import { Routes } from "./features/router/Routes";

export const Root = () => {
    useRedirect(Routes.LOGIN, window.location.pathname === Routes.ROOT);

    return (
        <NavigationShell>
            <AppOverlay />
            <Outlet />
        </NavigationShell>
    );
};
