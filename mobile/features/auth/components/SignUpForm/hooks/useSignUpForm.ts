import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    LOGIN_LENGTH_REQUIREMENT,
    LOGIN_MIN_LENGTH,
    NAME_LENGTH_REQUIREMENT,
    NAME_MIN_LENGTH,
    PASSWORD_LENGTH_REQUIREMENT,
    PASSWORD_MATCH_REQUIREMENT,
    PASSWORD_MIN_LENGTH,
} from "@/features/auth/components/SignUpForm/constants/requirements";

export type SignUpFormInputs = {
    login: string;
    name: string;
    password: string;
    confirmPassword: string;
};

const schema = yup.object({
    confirmPassword: yup
        .string()
        .required(PASSWORD_MATCH_REQUIREMENT)
        .oneOf([yup.ref("password")], PASSWORD_MATCH_REQUIREMENT),
    password: yup.string().required(PASSWORD_LENGTH_REQUIREMENT).min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_REQUIREMENT),
    login: yup.string().required(LOGIN_LENGTH_REQUIREMENT).min(LOGIN_MIN_LENGTH, LOGIN_LENGTH_REQUIREMENT),
    name: yup.string().required(NAME_LENGTH_REQUIREMENT).min(NAME_MIN_LENGTH, NAME_LENGTH_REQUIREMENT),
});

export const useSignUpForm = () => {
    return useForm<SignUpFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            login: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });
};
