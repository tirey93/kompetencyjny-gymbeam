import React from "react";
import { Button, Form } from "tamagui";
import { TextInput } from "@/components/TextInput/TextInput";
import { ChangePasswordFormStyled } from "@/features/users/components/ChangePasswordForm/styles";
import { ChangePasswordFormInputs, useChangePasswordForm } from "./hooks/useChangePasswordForm";

type ChangePasswordFormProps = {
    onSubmit: (inputs: ChangePasswordFormInputs) => void;
};

export const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useChangePasswordForm();

    return (
        <Form width="100%" onSubmit={handleSubmit(onSubmit)}>
            <ChangePasswordFormStyled.InputsContainer>
                <TextInput
                    name="oldPassword"
                    label="Old Password"
                    control={control}
                    error={errors.oldPassword?.message}
                    placeholder="Enter your old password"
                    secureTextEntry
                />

                <TextInput
                    name="newPassword"
                    label="New Password"
                    control={control}
                    error={errors.newPassword?.message}
                    placeholder="Enter your new password"
                    secureTextEntry
                />

                <TextInput
                    name="confirmPassword"
                    label="Confirm Password"
                    control={control}
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm your new password"
                    secureTextEntry
                />
            </ChangePasswordFormStyled.InputsContainer>

            <ChangePasswordFormStyled.ButtonsContainer>
                <Form.Trigger asChild>
                    <Button theme="success">Change Password</Button>
                </Form.Trigger>
            </ChangePasswordFormStyled.ButtonsContainer>
        </Form>
    );
};