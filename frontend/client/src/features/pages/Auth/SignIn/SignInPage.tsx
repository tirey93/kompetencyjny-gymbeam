import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useSignInForm } from "./hooks/useSignInForm";
import { useSignIn } from "../../../../common/auth";
import { ErrorMessage } from "../../../../common/components/DataDisplay";
import { useTranslate } from "../../../../common/i18n";
import { AppRoute } from "../../../router";

import classes from "./SignInPage.module.scss";

export const SignInPage = () => {
    const translate = useTranslate();
    const { form } = useSignInForm();
    const { signIn, error, reset } = useSignIn();
    const navigate = useNavigate();
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
                <Text span c="accent" inherit>
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
                <Button size="md" variant="gradient" onClick={onSubmit}>
                    {translate("pages.signIn.navigation.submit")}
                </Button>
                <Anchor className={classes.signUpLink} onClick={() => navigate(AppRoute.REGISTRATION)}>
                    {translate("pages.signIn.navigation.signUpLink")}
                </Anchor>
            </Stack>
        </Stack>
    );
};
