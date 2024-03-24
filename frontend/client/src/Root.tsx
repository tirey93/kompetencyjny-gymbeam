import { Outlet } from "react-router-dom";

import { AppOverlay } from "./common/components/AppOverlay/AppOverlay";
import { NavigationShell } from "./features/navigation/Shell/Shell";

export const Root = () => {
    return (
        <NavigationShell>
            <AppOverlay />
            <Outlet />
        </NavigationShell>
    );
};
