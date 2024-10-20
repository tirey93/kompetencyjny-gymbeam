import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import classes from "./RegistrationPage.module.scss";

import { AppRoute } from "@/app/router";
import { useSignUp } from "@/features/auth";
import { RegistrationForm } from "@/features/auth/components/SignUpForm/RegistrationForm";
import { RegistrationFormInputs } from "@/features/auth/components/SignUpForm/types";
import { useTranslate } from "@/lib/i18n";

export const RegistrationPage = () => {
    const isDesktop = useMediaQuery("(min-width: 60em)");
    const translate = useTranslate();
    const navigate = useNavigate();
    const { signUp, error, reset } = useSignUp();

    const onSubmitInternal = useCallback(
        async (inputs: RegistrationFormInputs) => {
            await signUp({ username: inputs.login, displayName: inputs.name, password: inputs.password });

            notifications.show({
                title: translate("notifications.auth.signedUp.title"),
                message: translate("notifications.auth.signedUp.description"),
                color: "success",
                withBorder: true,
            });
            navigate(AppRoute.ROOT);
        },
        [navigate, signUp, translate]
    );

    return (
        <Stack className={classes.container}>
            <RegistrationForm
                onSubmit={onSubmitInternal}
                isVerbose={isDesktop}
                error={error ?? ""}
                onCloseError={reset}
            />
        </Stack>
    );
};
