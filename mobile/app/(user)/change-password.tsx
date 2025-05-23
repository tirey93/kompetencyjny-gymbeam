import React, { useCallback } from "react";
import { router, Stack } from "expo-router";
import { toast } from "sonner-native";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { useChangePassword } from "@/features/users";
import { ChangePasswordFormInputs } from "@/features/users/components/ChangePasswordForm/hooks/useChangePasswordForm";
import { ChangePasswordForm } from "@/features/users/components/ChangePasswordForm/ChangePasswordForm";

export default function PasswordChangeScreen() {
    const { changePassword } = useChangePassword();

    const onSubmit = useCallback(
        async ({ oldPassword, newPassword, confirmPassword }: ChangePasswordFormInputs) => {
            try {
                await changePassword({ oldPassword, newPassword });
                toast.success("Password changed successfully.");
                router.push(Screens.Profile);
            } catch (error: any) {
                toast.error(error.message || "Failed to change password.");
            }
        },
        [changePassword]
    );

    return (
        <ScreenContainer>
            <Stack.Screen options={{ headerShown: false }} />
            <Styled.Container>
                <Styled.Header>Change Password</Styled.Header>
                <ChangePasswordForm onSubmit={onSubmit} />
            </Styled.Container>
        </ScreenContainer>
    );
}

const Styled = {
    Container: styled(View, {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "$background",
        padding: "$6",
    }),
    Header: styled(H2, {
        fontWeight: 700,
        width: "100%",
        marginBottom: "$4",
    }),
};