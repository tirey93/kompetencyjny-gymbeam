import {useCallback, useMemo} from "react";
import {ValidationRule} from "../Registration.types";

const MIN_LOGIN_LENGTH = 4;
const MAX_LOGIN_LENGTH = 64;
const LOGIN_MIN_LENGTH_MESSAGE = `Minimum ${MIN_LOGIN_LENGTH} characters.`;
const LOGIN_MAX_LENGTH_MESSAGE = `Up to ${MAX_LOGIN_LENGTH} characters.`;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 16;
const NAME_MIN_LENGTH_MESSAGE = `Minimum ${MIN_NAME_LENGTH} characters.`;
const NAME_MAX_LENGTH_MESSAGE = `Up to ${MAX_NAME_LENGTH} characters.`;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;
const PASSWORD_MIN_LENGTH_MESSAGE = `Minimum ${MIN_PASSWORD_LENGTH} characters`;
const PASSWORD_MAX_LENGTH_MESSAGE = `Up to ${MAX_PASSWORD_LENGTH} characters`;

const PASSWORDS_SHOULD_MATCH_MESSAGE = "Passwords have to match.";

export const useRegistrationValidationRules = () => {
    const validatePasswordMinimumLength = useCallback((password: string) => {
        return password.length >= MIN_PASSWORD_LENGTH
    }, [])

    const validatePasswordMaximumLength = useCallback((password: string) => {
        return password.length <= MAX_PASSWORD_LENGTH;
    }, [])

    const validateNameMinimumLength = useCallback((name: string) => {
        return name.length >= MIN_NAME_LENGTH
    }, [])

    const validateNameMaximumLength = useCallback((name: string) => {
        return name.length <= MAX_NAME_LENGTH;
    }, [])

    const validateLoginMinimumLength = useCallback((login: string) => {
        return login.length >= MIN_LOGIN_LENGTH
    }, [])

    const validateLoginMaximumLength = useCallback((login: string) => {
        return login.length <= MAX_LOGIN_LENGTH;
    }, [])

    const validatePasswordsMatch = useCallback((passwords: string[]) => {
        return passwords[0] === passwords[1];
    }, [])


    const passwordValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: PASSWORD_MIN_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validatePasswordMinimumLength,
            },
            {
                rule: PASSWORD_MAX_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validatePasswordMaximumLength
            }
        ]
    }, [validatePasswordMaximumLength, validatePasswordMinimumLength])

    const nameValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: NAME_MIN_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validateNameMinimumLength,
            },
            {
                rule: NAME_MAX_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validateNameMaximumLength
            }
        ]
    }, [validateNameMaximumLength, validateNameMinimumLength])

    const loginValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: LOGIN_MIN_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validateLoginMinimumLength,
            },
            {
                rule: LOGIN_MAX_LENGTH_MESSAGE,
                type: "singleValue",
                validator: validateLoginMaximumLength
            }
        ]
    }, [validateLoginMaximumLength, validateLoginMinimumLength])

    const confirmPasswordValidationRules = useMemo((): ValidationRule[] => {
        return [
            {
                rule: PASSWORDS_SHOULD_MATCH_MESSAGE,
                type: "multiValue",
                validator: validatePasswordsMatch,
            },
        ]
    }, [validatePasswordsMatch])

    return useMemo(() => ({
        login: loginValidationRules,
        name: nameValidationRules,
        password: passwordValidationRules,
        confirmPassword: confirmPasswordValidationRules
    }), [loginValidationRules, nameValidationRules, passwordValidationRules, confirmPasswordValidationRules]);
}
