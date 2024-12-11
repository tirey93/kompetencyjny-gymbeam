import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import classes from "./SignInPage.module.scss";

import { AppRoute } from "@/app/router";
import { SignInForm, SignInFormInputs, useSignIn } from "@/features/auth";
import { useTranslate } from "@/lib/i18n";

export const SignInPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { signIn, error, reset } = useSignIn();
    const { state: routeState } = useLocation();

    const onSubmit = useCallback(
        async ({ login, password }: SignInFormInputs) => {
            const user = await signIn({ username: login, password });

            notifications.show({
                title: translate("notifications.auth.signedIn.title"),
                message: translate("notifications.auth.signedIn.description", { user: user.name }),
                color: "success",
                withBorder: true,
            });

            navigate(routeState?.referer ?? AppRoute.ROOT);
        },
        [navigate, routeState?.referer, signIn, translate]
    );

    return (
        <Stack className={classes.container}>
            <SignInForm
                error={error}
                onSubmit={onSubmit}
                onCloseError={reset}
                onRegister={() => navigate(AppRoute.REGISTRATION)}
            />
        </Stack>
    );
};
