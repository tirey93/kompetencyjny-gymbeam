import { TextInput } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n";
import { INPUT_LABEL_PROPS } from "../../../Auth.shared";
import { RegistrationFormProps } from "../../Registration";
import { RequirementsList } from "../RequirementsList/RequirementsList";

export const NameForm = ({ form, rules }: RegistrationFormProps) => {
    const translate = useTranslate();

    return (
        <>
            <TextInput
                size="md"
                labelProps={INPUT_LABEL_PROPS}
                label={translate("pages.registration.field.name.label")}
                placeholder={translate("pages.registration.field.name.placeholder")}
                {...form.getInputProps("name")}
            />
            <RequirementsList rules={rules.name} />

            <TextInput
                size="md"
                labelProps={INPUT_LABEL_PROPS}
                label={translate("pages.registration.field.login.label")}
                placeholder={translate("pages.registration.field.login.placeholder")}
                {...form.getInputProps("login")}
                mt="md"
            />
            <RequirementsList rules={rules.login} />
        </>
    );
};
