import { useCallback, useMemo } from "react";
import { useForm } from "@mantine/form";

import { useRegistrationValidationRules } from "./useRegistrationValidationRules";

import {
    RegistrationFormInputs,
    RuleValidationResult,
    ValidationRule,
} from "@/features/auth/components/SignUpForm/types";

export type UseRegistrationForm = ReturnType<typeof useRegistrationForm>;
type RegistrationFormField = keyof RegistrationFormInputs;

export const useRegistrationForm = () => {
    const rules = useRegistrationValidationRules();

    const isRuleValidationError = useCallback((values: string[], rules: ValidationRule[]): RuleValidationResult[] => {
        return rules.map(({ rule, validator, type }) => ({
            rule,
            state: type === "singleValue" ? validator(values[0]) : validator(values),
        }));
    }, []);

    const isFieldValidationError = useCallback(
        (values: string[], rules: ValidationRule[]) => {
            const validatedRules = isRuleValidationError(values, rules);
            return validatedRules.some((rule) => !rule.state);
        },
        [isRuleValidationError]
    );

    const form = useForm<RegistrationFormInputs>({
        initialValues: {
            password: "",
            confirmPassword: "",
            login: "",
            name: "",
        },

        validate: (values) => ({
            name: isFieldValidationError([values.name], rules.name),
            login: isFieldValidationError([values.login], rules.login),
            password: isFieldValidationError([values.password], rules.password),
            confirmPassword: isFieldValidationError([values.confirmPassword, values.password], rules.confirmPassword),
        }),
    });

    const validateRulesOfField = useCallback(
        (field: RegistrationFormField, dependentField?: RegistrationFormField) => {
            if (!form.values[field] && !form.errors[field]) {
                return rules[field].map(({ rule }) => ({
                    rule,
                    state: null,
                }));
            } else {
                const values = [form.values[field]];
                dependentField && values.push(form.values[dependentField]);
                return isRuleValidationError(values, rules[field]);
            }
        },
        [form.errors, form.values, isRuleValidationError, rules]
    );

    const validatedRules = useMemo(
        () => ({
            name: validateRulesOfField("name"),
            login: validateRulesOfField("login"),
            password: validateRulesOfField("password"),
            confirmPassword: validateRulesOfField("confirmPassword", "password"),
        }),
        [validateRulesOfField]
    );

    return { form, validatedRules };
};
