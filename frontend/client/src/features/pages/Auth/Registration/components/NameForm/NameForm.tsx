import { TextInput } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
import { RegistrationFormProps } from "../../Registration.types";
import { RequirementsList } from "../RequirementsList/RequirementsList";

export const NameForm = ({ form, rules }: RegistrationFormProps) => {
    return (
        <>
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
        </>
    );
};
