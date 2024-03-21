import { useCallback } from "react";
import { Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

import { useSignInForm } from "./hooks/useSignInForm";
import { Routes } from "../../../router/Routes";

export const SignInPage = () => {
    const { form } = useSignInForm();

    const onSubmit = useCallback(() => {
        if (form.validate()) {
            console.log("sign in");
        }
    }, [form]);

    return (
        <Stack mih="60vh" justify="center" maw="600px" m="0 auto">
            <Title ta="center" mb="xl">
                Happy to see{" "}
                <Text span c="warning" inherit>
                    you
                </Text>{" "}
                back!
            </Title>
            <Paper radius="md" withBorder p="xl" shadow="xl">
                <Stack m="md">
                    <TextInput size="md" required label="LOGIN" placeholder="Login" {...form.getInputProps("login")} />
                    <PasswordInput
                        size="md"
                        mt="md"
                        required
                        label="PASSWORD"
                        placeholder="Password"
                        {...form.getInputProps("password")}
                    />
                </Stack>
            </Paper>
            <Stack mt="sm" maw="400px" miw="50%" m="0 auto">
                <Button
                    size="md"
                    variant="gradient"
                    gradient={{ from: "warning", to: "primary", deg: 45 }}
                    onClick={onSubmit}
                >
                    Sign in
                </Button>
                <Anchor ta="center" c="info" href={Routes.REGISTRATION}>
                    I do not have an account yet
                </Anchor>
            </Stack>
        </Stack>
    );
};
