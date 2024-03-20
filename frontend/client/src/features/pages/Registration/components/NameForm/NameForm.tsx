import {RegistrationFormProps} from "../../Registration.types";
import {StepperButtons} from "../StepperButtons/StepperButtons";
import { Styled } from "../../Registration.styled";
import {RequirementsList} from "../RequirementsList/RequirementsList";

export const NameForm = ({ onPreviousStep, onNextStep, form, rules }: RegistrationFormProps) => {
    const validateFields = () => {
        return !form.validateField("name").hasError && !form.validateField("login").hasError;
    }

    const onNextStepInternal = () => {
        if (validateFields()) {
            onNextStep?.();
        }
    }

    return <Styled.Stack>
        <Styled.TextInput size="md" required label="NAME" placeholder="Enter your display name" {...form.getInputProps("name")} />
        <RequirementsList rules={rules.name} />

        <Styled.TextInput size="md" required label="LOGIN" placeholder="Enter your login" {...form.getInputProps("login")} />
        <RequirementsList rules={rules.login} />

        <StepperButtons onPreviousStep={onPreviousStep} onNextStep={onNextStepInternal} />
    </Styled.Stack>
}
