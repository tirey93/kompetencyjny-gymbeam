import { Paper, PasswordInput, Stack } from "@mantine/core";

import { RegistrationFormProps } from "../../Registration.types";
import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";
import { RequirementsList } from "../RequirementsList/RequirementsList";

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
        <>
            <Paper radius="md" withBorder p="lg" shadow="xl">
                <Stack m="md">
                    <PasswordInput
                        size="md"
                        required
                        label="PASSWORD"
                        placeholder="Enter your password"
                        {...form.getInputProps("password")}
                    />
                    <RequirementsList rules={rules.password} />

                    <PasswordInput
                        size="md"
                        required
                        label="CONFIRM PASSWORD"
                        placeholder="Confirm your password"
                        {...form.getInputProps("confirmPassword")}
                        mt="md"
                    />
                    <RequirementsList rules={rules.confirmPassword} />
                </Stack>
            </Paper>
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStepInternal} />
        </>
    );
};
