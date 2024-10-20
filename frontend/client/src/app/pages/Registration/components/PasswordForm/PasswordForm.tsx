import React, { useCallback } from "react";
import { PasswordInput } from "@mantine/core";

import classes from "./PasswordForm.module.scss";

import { RequirementsList } from "@/app/pages/Registration/components";
import { RegistrationFormProps } from "@/app/pages/Registration/Registration";
import { useTranslate } from "@/lib/i18n";

export const PasswordForm = ({ form, rules, onSubmit }: RegistrationFormProps) => {
    const translate = useTranslate();

    const submitOnEnter = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                onSubmit?.();
            }
        },
        [onSubmit]
    );

    return (
        <>
            <PasswordInput
                autoFocus
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.password.label")}
                placeholder={translate("pages.registration.field.password.placeholder")}
                onKeyDown={submitOnEnter}
                {...form.getInputProps("password")}
            />
            <RequirementsList rules={rules.password} />

            <PasswordInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.confirmPassword.label")}
                placeholder={translate("pages.registration.field.confirmPassword.placeholder")}
                onKeyDown={submitOnEnter}
                {...form.getInputProps("confirmPassword")}
            />
            <RequirementsList rules={rules.confirmPassword} />
        </>
    );
};
