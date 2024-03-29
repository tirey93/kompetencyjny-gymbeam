import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useTranslate } from "../../i18n/hooks/useTranslate";
import { request, SignInRequestBody } from "../../request";
import { useAuthState } from "./useAuthState";

type UseSignIn = {
    signIn: (signInData: SignInRequestBody) => Promise<void>;
};

const signInRequest = (body: SignInRequestBody) => {
    return request("SignIn", { body, method: "POST" });
};

export const useSignIn = (): UseSignIn => {
    const { mutateAsync } = useMutation({
        mutationFn: signInRequest,
    });

    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const signIn = useCallback(
        async (signInRequestBody: SignInRequestBody) => {
            setIsLoading(true);
            const { data, error } = await mutateAsync(signInRequestBody);

            if (data) {
                const { name, displayName, role } = data;
                setCurrentUserDetails({ name, displayName, role });
                notifications.show({
                    title: translate("notifications.auth.signedIn.title"),
                    message: translate("notifications.auth.signedIn.description", { user: displayName }),
                    color: "success",
                    withBorder: true,
                });
            } else {
                console.error(error);
            }

            setIsLoading(false);
        },
        [mutateAsync, setCurrentUserDetails, setIsLoading, translate]
    );

    return { signIn };
};
