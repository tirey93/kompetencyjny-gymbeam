import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useTranslate } from "../../i18n/hooks/useTranslate";
import { request } from "../../request/request";
import { useAuthState } from "./useAuthState";

type UseSignOut = {
    signOut: () => Promise<void>;
};

const signOutRequest = () => {
    return request("api/Authentication/Logout/User/1", {
        method: "POST",
        credentials: "include",
    });
};

export const useSignOut = (): UseSignOut => {
    const { mutateAsync } = useMutation({
        mutationFn: signOutRequest,
    });

    const clearCurrentUserDetails = useAuthState((state) => state.clearCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const signOut = useCallback(async () => {
        setIsLoading(true);

        try {
            await mutateAsync();
            clearCurrentUserDetails();
            notifications.show({
                title: translate("notifications.auth.signedOut.title"),
                message: translate("notifications.auth.signedOut.description"),
                color: "success",
                withBorder: true,
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [clearCurrentUserDetails, mutateAsync, setIsLoading, translate]);

    return { signOut };
};
