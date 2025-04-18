import React from "react";
import { Form } from "tamagui";

import { SignInFormInputs, useSignInForm } from "./hooks/useSignInForm";
import { GoogleOAuthButton } from "../GoogleOAuthButton/GoogleOAuthButton";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput/TextInput";
import { SignInFormStyled } from "@/features/auth/components/SignInForm/styles";

type SignInFormProps = {
    onSubmit: (inputs: SignInFormInputs) => void;
    isLoading?: boolean;
};

export const SignInForm = ({ onSubmit, isLoading }: SignInFormProps) => {
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
                    label="Login"
                    control={control}
                    error={errors.login?.message}
                    placeholder="Enter your login"
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
                    <Button theme="success" isLoading={isLoading}>
                        Sign in
                    </Button>
                </Form.Trigger>
                <GoogleOAuthButton />
            </SignInFormStyled.ButtonsContainer>
        </Form>
    );
};
