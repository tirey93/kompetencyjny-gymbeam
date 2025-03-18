import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from '@/common/validation/passwordRules'
import * as yup from "yup";

import {
    LOGIN_LENGTH_REQUIREMENT,
    LOGIN_MIN_LENGTH,
    NAME_LENGTH_REQUIREMENT,
    NAME_MIN_LENGTH,
} from "@/features/auth/components/SignUpForm/constants/requirements";

export type SignUpFormInputs = {
    login: string;
    name: string;
    password: string;
    confirmPassword: string;
};

const registrationSchema = yup
    .object({
        login: yup.string().required(LOGIN_LENGTH_REQUIREMENT).min(LOGIN_MIN_LENGTH, LOGIN_LENGTH_REQUIREMENT),
        name: yup.string().required(NAME_LENGTH_REQUIREMENT).min(NAME_MIN_LENGTH, NAME_LENGTH_REQUIREMENT),
    })
    .concat(passwordSchema);

export const useSignUpForm = () => {
    return useForm<SignUpFormInputs>({
        resolver: yupResolver(registrationSchema),
        defaultValues: {
            login: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });
};
