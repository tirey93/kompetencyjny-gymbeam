import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Divider, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import classes from "./SignInPage.module.scss";

import { GoogleOAuthButton } from "@/app/pages/SignIn/components/GoogleOAuthButton";
import { useSignInForm } from "@/app/pages/SignIn/hooks/useSignInForm";
import { AppRoute } from "@/app/router";
import { ErrorMessage } from "@/components/DataDisplay";
import { useSignIn } from "@/features/auth";
import { useTranslate } from "@/lib/i18n";

export const SignInPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { form } = useSignInForm();
    const { signIn, error, reset } = useSignIn();
    const { state: routeState } = useLocation();

    const onSubmit = useCallback(async () => {
        if (!form.validate().hasErrors) {
            const { login, password } = form.values;
            const user = await signIn({ username: login, password });

            notifications.show({
                title: translate("notifications.auth.signedIn.title"),
                message: translate("notifications.auth.signedIn.description", { user: user.displayName }),
                color: "success",
                withBorder: true,
            });

            navigate(routeState?.referer ?? AppRoute.ROOT);
        }
    }, [form, navigate, routeState?.referer, signIn, translate]);

    const submitOnEnter = useCallback(
        async (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                await onSubmit();
            }
        },
        [onSubmit]
    );

    return (
        <Stack className={classes.container}>
            <Title className={classes.title}>
                {translate("pages.signIn.header.preEmphasis")}{" "}
                <Text span className={classes.titleEmphasis} inherit>
                    {translate("pages.signIn.header.emphasised")}
                </Text>{" "}
                {translate("pages.signIn.header.postEmphasis")}
            </Title>

            <Paper className={classes.form} withBorder component={Stack}>
                <TextInput
                    autoFocus
                    classNames={{
                        label: classes.inputLabel,
                    }}
                    size="md"
                    label={translate("pages.signIn.field.login.label")}
                    placeholder={translate("pages.signIn.field.login.placeholder")}
                    onKeyDown={submitOnEnter}
                    {...form.getInputProps("login")}
                />
                <PasswordInput
                    classNames={{
                        label: classes.inputLabel,
                    }}
                    size="md"
                    label={translate("pages.signIn.field.password.label")}
                    placeholder={translate("pages.signIn.field.password.placeholder")}
                    onKeyDown={submitOnEnter}
                    {...form.getInputProps("password")}
                />
            </Paper>

            {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}

            <Stack className={classes.buttonsContainer}>
                <Button size="md" color="success" onClick={onSubmit}>
                    {translate("pages.signIn.navigation.submit")}
                </Button>
                <Button variant="subtle" color="info" onClick={() => navigate(AppRoute.REGISTRATION)}>
                    {translate("pages.signIn.navigation.signUpLink")}
                </Button>

                <Divider label={translate("pages.signIn.oAuth.divider")} />
                <GoogleOAuthButton />
            </Stack>
        </Stack>
    );
};
