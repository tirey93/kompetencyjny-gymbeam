import {UseRegistrationForm} from "./hooks/useRegistrationForm";

export type RegistrationFormProps = {
    onNextStep?: () => unknown;
    onPreviousStep?: () => unknown;
    form: UseRegistrationForm["form"];
    rules: UseRegistrationForm["validatedRules"];
}

export type ValidationRule = {
    rule: string;
    type: "singleValue",
    validator: (value: string) => boolean;
} | {
    rule: string;
    type: "multiValue",
    validator: (values: string[]) => boolean;
}

export type RuleValidationResult = {
    rule: string,
    state: boolean | null
}
