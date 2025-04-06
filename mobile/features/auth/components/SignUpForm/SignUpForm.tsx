import React from "react";
import { Form } from "tamagui";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput/TextInput";
import { SignInFormStyled } from "@/features/auth/components/SignInForm/styles";
import {
    LOGIN_LENGTH_REQUIREMENT,
    NAME_LENGTH_REQUIREMENT,
    PASSWORD_LENGTH_REQUIREMENT,
    PASSWORD_MATCH_REQUIREMENT,
} from "@/features/auth/components/SignUpForm/constants/requirements";
import { SignUpFormInputs, useSignUpForm } from "@/features/auth/components/SignUpForm/hooks/useSignUpForm";

type SignUpFormProps = {
    onSubmit: (inputs: SignUpFormInputs) => void;
    isLoading?: boolean;
};

export const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useSignUpForm();

    const onFormSubmit = (data: SignUpFormInputs) => {
        const trimmedLogin = data.login.trim();
        const trimmedName = data.name.trim();
        onSubmit({ ...data, login: trimmedLogin, name: trimmedName });
    };

    return (
        <Form width="100%" onSubmit={handleSubmit(onFormSubmit)}>
            <SignInFormStyled.InputsContainer>
                <TextInput
                    name="name"
                    label="Name"
                    control={control}
                    error={errors.name?.message}
                    requirements={[NAME_LENGTH_REQUIREMENT]}
                    placeholder="How should we call you?"
                />

                <TextInput
                    name="login"
                    label="Login"
                    control={control}
                    error={errors.login?.message}
                    requirements={[LOGIN_LENGTH_REQUIREMENT]}
                    placeholder="Enter your login"
                />

                <TextInput
                    name="password"
                    label="Password"
                    control={control}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                    requirements={[PASSWORD_LENGTH_REQUIREMENT]}
                    secureTextEntry
                />

                <TextInput
                    name="confirmPassword"
                    label="Confirm password"
                    control={control}
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm your password"
                    requirements={[PASSWORD_MATCH_REQUIREMENT]}
                    secureTextEntry
                />
            </SignInFormStyled.InputsContainer>

            <SignInFormStyled.ButtonsContainer>
                <Form.Trigger asChild>
                    <Button theme="success" isLoading={isLoading}>
                        Sign up
                    </Button>
                </Form.Trigger>
            </SignInFormStyled.ButtonsContainer>
        </Form>
    );
};
