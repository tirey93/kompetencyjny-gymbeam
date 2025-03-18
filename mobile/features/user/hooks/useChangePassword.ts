import { useCallback } from "react";
import { ChangePasswordBody } from "../api/types";
import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { UserService } from "../api/userService";

type UseChangePassword = {
    changePassword: (changePasswordData: ChangePasswordBody) => Promise<void>;
};

export const useChangePassword = (): UseChangePassword => {
    // const { mutateAsync } = useMutation({
    //     mutationFn: AuthService.changePassword,
    // });

    const changePassword = useCallback(
        async (changePasswordBody: ChangePasswordBody) => {
            try {
                // await UserService.changePassword(changePasswordBody);

                console.log("Password changed successfully.");
            } catch (error) {
                const errorMessage = mapErrorToErrorMessage(error, errorsMap);
                throw new Error(errorMessage);
            }
        },
        []
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