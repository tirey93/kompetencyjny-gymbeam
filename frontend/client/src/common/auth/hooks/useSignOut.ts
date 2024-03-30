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
    return request("SignOut", { method: "POST" });
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
        const { error } = await mutateAsync();
        setIsLoading(false);

        if (error) {
            notifications.show({
                title: translate("notifications.auth.signingOutFailed.title"),
                message: translate("notifications.auth.signingOutFailed.description"),
                color: "error",
                withBorder: true,
            });

            throw new Error(translate("apiErrors.auth.signOut.default"));
        } else {
            clearCurrentUserDetails();
            notifications.show({
                title: translate("notifications.auth.signedOut.title"),
                message: translate("notifications.auth.signedOut.description"),
                color: "success",
                withBorder: true,
            });
        }
    }, [clearCurrentUserDetails, mutateAsync, setIsLoading, translate]);

    return { signOut };
};
