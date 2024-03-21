import { Paper, PasswordInput, Stack } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
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
                        label={translate("pages.registration.field.password.label")}
                        placeholder={translate("pages.registration.field.password.placeholder")}
                        {...form.getInputProps("password")}
                    />
                    <RequirementsList rules={rules.password} />

                    <PasswordInput
                        size="md"
                        required
                        label={translate("pages.registration.field.confirmPassword.label")}
                        placeholder={translate("pages.registration.field.confirmPassword.placeholder")}
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
