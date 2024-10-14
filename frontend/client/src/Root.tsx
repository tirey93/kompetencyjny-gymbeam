import { Outlet } from "react-router-dom";

import { useUpdateSignedInUser } from "./common/auth";
import { AppOverlay } from "./common/components/AppOverlay";
import { CookiesPopup, useCookiesPopup } from "./common/components/CookiesPopup";
import { AppNavigation } from "./features/navigation";

export const Root = () => {
    useUpdateSignedInUser();
    const { accept, isOpen, close } = useCookiesPopup();

    return (
        <AppNavigation>
            {isOpen && <CookiesPopup onClose={close} onAccept={accept} />}
            <AppOverlay />
            <Outlet />
        </AppNavigation>
    );
};
