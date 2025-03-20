import { useCallback } from "react";
import { ChangePasswordBody } from "../api/types";
import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { UserService } from "../api/userService";
import { useAuthState } from "@/features/auth";

type UseChangePassword = {
    changePassword: (changePasswordData: ChangePasswordBody) => Promise<void>;
};

export const useChangePassword = (): UseChangePassword => {
    const { user } = useAuthState();
    // const { mutateAsync } = useMutation({
    //     mutationFn: AuthService.changePassword,
    // });

    const changePassword = useCallback(
        async (changePasswordBody: ChangePasswordBody) => {
            try {
                if (!user || !user.id) {
                    throw new Error("User ID is required but not found.");
                }

                // await UserService.changePassword(user.id, changePasswordBody);

                console.log("Password changed successfully.");
            } catch (error) {
                const errorMessage = mapErrorToErrorMessage(error, errorsMap);
                throw new Error(errorMessage);
            }
        },
        [user]
    );

    return { changePassword };
};

const errorsMap = {
    defaultError: "Unknown error.",
    statusCodesMap: {
        400: "Validation error: check your input.",
        401: "Unauthorized action.",
        404: "User not found"
    },
};