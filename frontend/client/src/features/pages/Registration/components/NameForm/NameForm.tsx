import { Paper } from "@mantine/core";

import { Styled } from "../../Registration.styled";
import { RegistrationFormProps } from "../../Registration.types";
import { RequirementsList } from "../RequirementsList/RequirementsList";
import { StepperButtons } from "../StepperButtons/StepperButtons";

export const NameForm = ({ onPreviousStep, onNextStep, form, rules }: RegistrationFormProps) => {
    const validateFields = () => {
        return !form.validateField("name").hasError && !form.validateField("login").hasError;
    };

    const onNextStepInternal = () => {
        if (validateFields()) {
            onNextStep?.();
        }
    };

    return (
        <>
            <Paper radius="md" withBorder p="lg" shadow="xl">
                <Styled.Stack>
                    <Styled.TextInput
                        size="md"
                        required
                        label="NAME"
                        placeholder="Enter your display name"
                        {...form.getInputProps("name")}
                    />
                    <RequirementsList rules={rules.name} />

                    <Styled.TextInput
                        size="md"
                        required
                        label="LOGIN"
                        placeholder="Enter your login"
                        {...form.getInputProps("login")}
                    />
                    <RequirementsList rules={rules.login} />
                </Styled.Stack>
            </Paper>
            <StepperButtons onPreviousStep={onPreviousStep} onNextStep={onNextStepInternal} />
        </>
    );
};
