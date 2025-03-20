import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { passwordValidationRule, confirmPasswordValidationRule } from '@/common/validation/passwordRules'


export type ChangePasswordFormInputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export const OLD_PASSWORD_REQUIREMENT = "Old password is required.";

const ChangePasswordSchema = yup.object({
    oldPassword: yup.string().required(OLD_PASSWORD_REQUIREMENT),
    newPassword: passwordValidationRule,
    confirmPassword: confirmPasswordValidationRule("newPassword"),
});

export const useChangePasswordForm = () => {
    return useForm<ChangePasswordFormInputs>({
        resolver: yupResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });
};