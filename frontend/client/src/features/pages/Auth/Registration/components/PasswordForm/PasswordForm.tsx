import { PasswordInput } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n";
import { RegistrationFormProps } from "../../Registration";
import { RequirementsList } from "../RequirementsList/RequirementsList";

import classes from "./PasswordForm.module.scss";

export const PasswordForm = ({ form, rules }: RegistrationFormProps) => {
    const translate = useTranslate();

    return (
        <>
            <PasswordInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.password.label")}
                placeholder={translate("pages.registration.field.password.placeholder")}
                {...form.getInputProps("password")}
            />
            <RequirementsList rules={rules.password} />

            <PasswordInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.confirmPassword.label")}
                placeholder={translate("pages.registration.field.confirmPassword.placeholder")}
                {...form.getInputProps("confirmPassword")}
            />
            <RequirementsList rules={rules.confirmPassword} />
        </>
    );
};
