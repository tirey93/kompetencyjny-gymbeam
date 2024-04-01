import { Outlet } from "react-router-dom";

import { useUpdateSignedInUser } from "./common/auth";
import { AppOverlay } from "./common/components/AppOverlay";
import { AppNavigation } from "./features/navigation";

export const Root = () => {
    useUpdateSignedInUser();

    return (
        <AppNavigation>
            <AppOverlay />
            <Outlet />
        </AppNavigation>
    );
};
