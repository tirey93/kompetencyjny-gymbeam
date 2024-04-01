import { TextInput } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n";
import { RegistrationFormProps } from "../../Registration";
import { RequirementsList } from "../RequirementsList/RequirementsList";

import classes from "./NameForm.module.scss";

export const NameForm = ({ form, rules }: RegistrationFormProps) => {
    const translate = useTranslate();

    return (
        <>
            <TextInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.name.label")}
                placeholder={translate("pages.registration.field.name.placeholder")}
                {...form.getInputProps("name")}
            />
            <RequirementsList rules={rules.name} />

            <TextInput
                size="md"
                classNames={{ label: classes.inputLabel }}
                label={translate("pages.registration.field.login.label")}
                placeholder={translate("pages.registration.field.login.placeholder")}
                {...form.getInputProps("login")}
            />
            <RequirementsList rules={rules.login} />
        </>
    );
};
