import { PasswordInput } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";
import { INPUT_LABEL_PROPS } from "../../../Auth.shared";
import { RegistrationFormProps } from "../../Registration.types";
import { RequirementsList } from "../RequirementsList/RequirementsList";

export const PasswordForm = ({ form, rules }: RegistrationFormProps) => {
    const translate = useTranslate();

    return (
        <>
            <PasswordInput
                size="md"
                labelProps={INPUT_LABEL_PROPS}
                label={translate("pages.registration.field.password.label")}
                placeholder={translate("pages.registration.field.password.placeholder")}
                {...form.getInputProps("password")}
            />
            <RequirementsList rules={rules.password} />

            <PasswordInput
                size="md"
                labelProps={INPUT_LABEL_PROPS}
                label={translate("pages.registration.field.confirmPassword.label")}
                placeholder={translate("pages.registration.field.confirmPassword.placeholder")}
                {...form.getInputProps("confirmPassword")}
                mt="md"
            />
            <RequirementsList rules={rules.confirmPassword} />
        </>
    );
};
