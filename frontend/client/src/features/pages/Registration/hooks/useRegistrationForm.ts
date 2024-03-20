import {useForm} from "@mantine/form";
import {RuleValidationResult, ValidationRule} from "../Registration.types";
import {useRegistrationValidationRules} from "./useRegistrationValidationRules";
import {useCallback, useMemo} from "react";

export type UseRegistrationForm = ReturnType<typeof useRegistrationForm>;
type RegistrationFormField = "login" | "password" | "confirmPassword" | "name";

export const useRegistrationForm = () => {
    const rules = useRegistrationValidationRules();

    const isRuleValidationError = useCallback((values: string[], rules: ValidationRule[]): RuleValidationResult[] => {
        return rules.map(({ rule, validator, type}) => ({
            rule,
            state: type === "singleValue" ? validator(values[0]) : validator(values)
        }));
    }, [])

    const isFieldValidationError = useCallback((values: string[], rules: ValidationRule[]) => {
        const validatedRules = isRuleValidationError(values, rules);
        return validatedRules.some((rule) => !rule.state);
    }, [])

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
            login: "",
            name: ""
        },

        validate: (values) => ({
            name: isFieldValidationError([values.name], rules.name),
            login: isFieldValidationError([values.login], rules.login),
            password: isFieldValidationError([values.password], rules.password),
            confirmPassword: isFieldValidationError([values.confirmPassword, values.password], rules.confirmPassword),
        })
    });

    const validateRulesOfField = useCallback((field: RegistrationFormField, dependentField?: RegistrationFormField) => {
        if (!form.values[field] && !form.errors[field]) {
            return rules[field].map(({ rule }) => ({
                rule,
                state: null
            }));
        } else {
            const values = [form.values[field]];
            dependentField && values.push(form.values[dependentField]);
            return isRuleValidationError(values, rules[field])
        }
    }, [form]);

    const validatedRules = useMemo(() => ({
        name: validateRulesOfField("name"),
        login: validateRulesOfField("login"),
        password: validateRulesOfField("password"),
        confirmPassword: validateRulesOfField("confirmPassword", "password"),
    }), [validateRulesOfField])

    return { form, validatedRules };
}
