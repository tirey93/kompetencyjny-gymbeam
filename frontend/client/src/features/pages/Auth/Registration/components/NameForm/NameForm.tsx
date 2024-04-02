import React, { useCallback } from "react";
import { TextInput } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n";
import { RegistrationFormProps } from "../../Registration";
import { RequirementsList } from "../RequirementsList/RequirementsList";

import classes from "./NameForm.module.scss";

export const NameForm = ({ form, rules, onSubmit }: RegistrationFormProps) => {
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
            <TextInput
                autoFocus
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.name.label")}
                placeholder={translate("pages.registration.field.name.placeholder")}
                onKeyDown={submitOnEnter}
                {...form.getInputProps("name")}
            />
            <RequirementsList rules={rules.name} />

            <TextInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.login.label")}
                placeholder={translate("pages.registration.field.login.placeholder")}
                onKeyDown={submitOnEnter}
                {...form.getInputProps("login")}
            />
            <RequirementsList rules={rules.login} />
        </>
    );
};
