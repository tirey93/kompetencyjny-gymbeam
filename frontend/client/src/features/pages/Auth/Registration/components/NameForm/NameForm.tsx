import { Paper, Stack, TextInput } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
import { RegistrationFormProps } from "../../Registration.types";
import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";
import { RequirementsList } from "../RequirementsList/RequirementsList";

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
                <Stack m="md">
                    <TextInput
                        size="md"
                        required
                        label={translate("pages.registration.field.name.label")}
                        placeholder={translate("pages.registration.field.name.placeholder")}
                        {...form.getInputProps("name")}
                    />
                    <RequirementsList rules={rules.name} />

                    <TextInput
                        size="md"
                        required
                        label={translate("pages.registration.field.login.label")}
                        placeholder={translate("pages.registration.field.login.placeholder")}
                        {...form.getInputProps("login")}
                        mt="md"
                    />
                    <RequirementsList rules={rules.login} />
                </Stack>
            </Paper>
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStepInternal} />
        </>
    );
};
