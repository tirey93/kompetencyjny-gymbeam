import { Outlet } from "react-router-dom";

import { useUpdateSignedInUser } from "./common/auth/hooks/useUpdateSignedInUser";
import { AppOverlay } from "./common/components/AppOverlay/AppOverlay";
import { NavigationShell } from "./features/navigation/Shell/Shell";

export const Root = () => {
    useUpdateSignedInUser();

    return (
        <NavigationShell>
            <AppOverlay />
            <Outlet />
        </NavigationShell>
    );
};
