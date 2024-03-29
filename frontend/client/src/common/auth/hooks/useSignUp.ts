import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { useAppOverlayStore } from "../../components/AppOverlay/hooks/useAppOverlayStore";
import { useTranslate } from "../../i18n/hooks/useTranslate";
import { request, SignUpRequestBody } from "../../request";
import { useAuthState } from "./useAuthState";

type UseSignUp = {
    signUp: (signUpData: SignUpRequestBody) => Promise<void>;
};

const signUpRequest = (body: SignUpRequestBody) => {
    return request("SignUp", { body, method: "POST" });
};

export const useSignUp = (): UseSignUp => {
    const { mutateAsync } = useMutation({
        mutationFn: signUpRequest,
    });

    const setCurrentUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const translate = useTranslate();

    const signUp = useCallback(
        async (signUpRequestBody: SignUpRequestBody) => {
            setIsLoading(true);
            const { data, error } = await mutateAsync(signUpRequestBody);

            if (data) {
                const { name, displayName, role } = data;
                setCurrentUserDetails({ name, displayName, role });
                notifications.show({
                    title: translate("notifications.auth.signedUp.title"),
                    message: translate("notifications.auth.signedUp.description"),
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

    return { signUp };
};
