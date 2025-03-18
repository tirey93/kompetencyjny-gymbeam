import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type ChangePasswordFormInputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const schema = yup.object({
    oldPassword: yup.string().required("Old password is required."),
    newPassword: yup.string().required("New password is required."),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword')], "Passwords must match.")
        .required("Confirmation is required."),
});

export const useChangePasswordForm = () => {
    return useForm<ChangePasswordFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });
};