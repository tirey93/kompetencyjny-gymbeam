import { Outlet } from "react-router-dom";

import { AppNavigation } from "@/app/navigation";
import { AppOverlay } from "@/components/AppOverlay";
import { useUpdateSignedInUser } from "@/features/auth";
import { CookiesPopup, useCookiesPopup } from "@/features/cookies";

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
