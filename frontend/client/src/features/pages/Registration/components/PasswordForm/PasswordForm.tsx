import { Styled } from "../../Registration.styled";
import { RegistrationFormProps } from "../../Registration.types";
import { RequirementsList } from "../RequirementsList/RequirementsList";
import { StepperButtons } from "../StepperButtons/StepperButtons";

export const PasswordForm = ({ onPreviousStep, onNextStep, form, rules }: RegistrationFormProps) => {
    const validateFields = () => {
        return !form.validateField("password").hasError && !form.validateField("confirmPassword").hasError;
    };

    const onNextStepInternal = () => {
        if (validateFields()) {
            onNextStep?.();
        }
    };

    return (
        <Styled.Stack>
            <Styled.PasswordInput
                size="md"
                required
                label="PASSWORD"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
            />
            <RequirementsList rules={rules.password} />

            <Styled.PasswordInput
                size="md"
                required
                label="CONFIRM PASSWORD"
                placeholder="Confirm your password"
                {...form.getInputProps("confirmPassword")}
            />
            <RequirementsList rules={rules.confirmPassword} />

            <StepperButtons onPreviousStep={onPreviousStep} onNextStep={onNextStepInternal} />
        </Styled.Stack>
    );
};
