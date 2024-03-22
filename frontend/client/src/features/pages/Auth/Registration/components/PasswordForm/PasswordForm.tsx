import { PasswordInput } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
import { RegistrationFormProps } from "../../Registration.types";
import { RequirementsList } from "../RequirementsList/RequirementsList";

export const PasswordForm = ({ form, rules }: RegistrationFormProps) => {
    return (
        <>
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
        </>
    );
};
