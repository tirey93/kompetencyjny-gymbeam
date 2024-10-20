import { UseRegistrationForm } from "./hooks/useRegistrationForm";

export type RegistrationFormInputs = {
    login: string;
    password: string;
    name: string;
    confirmPassword: string;
};

export type RegistrationFormProps = {
    form: UseRegistrationForm["form"];
    rules: UseRegistrationForm["validatedRules"];
    onSubmit?: () => unknown;
};

export type ValidationRule =
    | {
          rule: string;
          type: "singleValue";
          validator: (value: string) => boolean;
      }
    | {
          rule: string;
          type: "multiValue";
          validator: (values: string[]) => boolean;
      };

export type RuleValidationResult = {
    rule: string;
    state: boolean | null;
};
