import React from "react";
import { Link } from "expo-router";
import { Button, Form, Separator } from "tamagui";

import { SignInFormInputs, useSignInForm } from "./hooks/useSignInForm";
import { GoogleOAuthButton } from "../GoogleOAuthButton/GoogleOAuthButton";

import { TextInput } from "@/components/TextInput/TextInput";
import { Screens } from "@/constants/Screens";
import { SignInFormStyled } from "@/features/auth/components/SignInForm/styles";

type SignInFormProps = {
    onSubmit: (inputs: SignInFormInputs) => void;
};

export const SignInForm = ({ onSubmit }: SignInFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useSignInForm();

    const onFormSubmit = (data: SignInFormInputs) => {
        const trimmedLogin = data.login.trim();
        onSubmit({ ...data, login: trimmedLogin });
    };

    return (
        <Form width="100%" onSubmit={handleSubmit(onFormSubmit)}>
            <SignInFormStyled.InputsContainer>
                <TextInput
                    name="login"
                    label="Email"
                    control={control}
                    error={errors.login?.message}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <TextInput
                    name="password"
                    label="Password"
                    control={control}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                    secureTextEntry
                />
            </SignInFormStyled.InputsContainer>

            <SignInFormStyled.ButtonsContainer>
                <Form.Trigger asChild>
                    <Button theme="accent">Sign in</Button>
                </Form.Trigger>

                <Link href={Screens.SignUp} asChild>
                    <Button>I don&#39;t have an account.</Button>
                </Link>

                <Separator />
                <GoogleOAuthButton />
            </SignInFormStyled.ButtonsContainer>
        </Form>
    );
};
