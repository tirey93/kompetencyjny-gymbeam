import { useMemo } from "react";

import { ValidationRule } from "../types";

import { useTranslate } from "@/lib/i18n";

const MIN_LOGIN_LENGTH = 5;
const MAX_LOGIN_LENGTH = 20;

const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 20;

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 255;

export const useRegistrationValidationRules = () => {
    const translate = useTranslate();

    const passwordValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: translate("pages.registration.field.password.validation.tooShort", {
                    length: MIN_PASSWORD_LENGTH,
                }),
                type: "singleValue",
                validator: validatePasswordMinimumLength,
            },
            {
                rule: translate("pages.registration.field.password.validation.tooLong", {
                    length: MAX_PASSWORD_LENGTH,
                }),
                type: "singleValue",
                validator: validatePasswordMaximumLength,
            },
        ];
    }, [translate]);

    const nameValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: translate("pages.registration.field.name.validation.tooShort", { length: MIN_NAME_LENGTH }),
                type: "singleValue",
                validator: validateNameMinimumLength,
            },
            {
                rule: translate("pages.registration.field.name.validation.tooLong", { length: MAX_NAME_LENGTH }),
                type: "singleValue",
                validator: validateNameMaximumLength,
            },
        ];
    }, [translate]);

    const loginValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: translate("pages.registration.field.login.validation.tooShort", { length: MIN_LOGIN_LENGTH }),
                type: "singleValue",
                validator: validateLoginMinimumLength,
            },
            {
                rule: translate("pages.registration.field.login.validation.tooLong", { length: MAX_LOGIN_LENGTH }),
                type: "singleValue",
                validator: validateLoginMaximumLength,
            },
        ];
    }, [translate]);

    const confirmPasswordValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: translate("pages.registration.field.confirmPassword.validation.noMatch"),
                type: "multiValue",
                validator: validatePasswordsMatch,
            },
        ];
    }, [translate]);

    return useMemo(
        () => ({
            login: loginValidationRules,
            name: nameValidationRules,
            password: passwordValidationRules,
            confirmPassword: confirmPasswordValidationRules,
        }),
        [loginValidationRules, nameValidationRules, passwordValidationRules, confirmPasswordValidationRules]
    );
};

const validatePasswordMinimumLength = (password: string) => {
    return password.length >= MIN_PASSWORD_LENGTH;
};

const validatePasswordMaximumLength = (password: string) => {
    return password.length <= MAX_PASSWORD_LENGTH;
};

const validateNameMinimumLength = (name: string) => {
    return name.trim().length >= MIN_NAME_LENGTH;
};

const validateNameMaximumLength = (name: string) => {
    return name.trim().length <= MAX_NAME_LENGTH;
};

const validateLoginMinimumLength = (login: string) => {
    return login.trim().length >= MIN_LOGIN_LENGTH;
};

const validateLoginMaximumLength = (login: string) => {
    return login.trim().length <= MAX_LOGIN_LENGTH;
};

const validatePasswordsMatch = (passwords: string[]) => {
    return passwords[0] === passwords[1];
};
