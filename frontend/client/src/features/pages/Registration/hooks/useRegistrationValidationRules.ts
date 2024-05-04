import { useCallback, useMemo } from "react";

import { useTranslate } from "../../../../common/i18n";
import { ValidationRule } from "../Registration";

const MIN_LOGIN_LENGTH = 5;
const MAX_LOGIN_LENGTH = 20;

const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 20;

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 255;

export const useRegistrationValidationRules = () => {
    const translate = useTranslate();

    const validatePasswordMinimumLength = useCallback((password: string) => {
        return password.length >= MIN_PASSWORD_LENGTH;
    }, []);

    const validatePasswordMaximumLength = useCallback((password: string) => {
        return password.length <= MAX_PASSWORD_LENGTH;
    }, []);

    const validateNameMinimumLength = useCallback((name: string) => {
        return name.length >= MIN_NAME_LENGTH;
    }, []);

    const validateNameMaximumLength = useCallback((name: string) => {
        return name.length <= MAX_NAME_LENGTH;
    }, []);

    const validateLoginMinimumLength = useCallback((login: string) => {
        return login.length >= MIN_LOGIN_LENGTH;
    }, []);

    const validateLoginMaximumLength = useCallback((login: string) => {
        return login.length <= MAX_LOGIN_LENGTH;
    }, []);

    const validatePasswordsMatch = useCallback((passwords: string[]) => {
        return passwords[0] === passwords[1];
    }, []);

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
    }, [translate, validatePasswordMaximumLength, validatePasswordMinimumLength]);

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
    }, [translate, validateNameMaximumLength, validateNameMinimumLength]);

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
    }, [translate, validateLoginMaximumLength, validateLoginMinimumLength]);

    const confirmPasswordValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: translate("pages.registration.field.confirmPassword.validation.noMatch"),
                type: "multiValue",
                validator: validatePasswordsMatch,
            },
        ];
    }, [translate, validatePasswordsMatch]);

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
