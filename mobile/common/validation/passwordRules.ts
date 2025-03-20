import * as yup from "yup";

import {
    PASSWORD_LENGTH_REQUIREMENT,
    PASSWORD_MATCH_REQUIREMENT,
    PASSWORD_MIN_LENGTH,
} from "@/features/auth/components/SignUpForm/constants/requirements";

export const passwordValidationRule = yup
    .string()
    .required(PASSWORD_LENGTH_REQUIREMENT)
    .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_REQUIREMENT)

export const confirmPasswordValidationRule = (fieldName: string) =>
    yup
        .string()
        .required(PASSWORD_MATCH_REQUIREMENT)
        .oneOf([yup.ref(fieldName)], PASSWORD_MATCH_REQUIREMENT)

export const passwordSchema = yup.object({
    confirmPassword: confirmPasswordValidationRule("password"),
    password: passwordValidationRule
});

