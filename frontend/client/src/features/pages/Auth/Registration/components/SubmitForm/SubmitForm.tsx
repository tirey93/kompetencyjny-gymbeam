import { useState } from "react";
import { CloseButton, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";

import { translate } from "../../../../../../common/i18n/i18n";
import { RegistrationFormProps } from "../../Registration.types";

export const SubmitForm = ({ form }: RegistrationFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <>
            <Text fw={600} mb="xl" ta="center">
                {translate("pages.registration.steps.summary.header")}
            </Text>

            <Stack align="center" gap="xs">
                <ThemeIcon radius="100%" size={100} color="primary">
                    <IconUser size={50} />
                </ThemeIcon>

                <Text ta="center" fz="lg" fw={500} mt="md">
                    {form.values.name}
                </Text>

                <Text ta="center" c="dimmed" fz="md">
                    {translate("pages.registration.steps.summary.login")}: {form.values.login}
                </Text>

                <Group>
                    <Text ta="center" c="dimmed" fz="md">
                        {translate("pages.registration.steps.summary.password")}:{" "}
                        {isPasswordVisible ? form.values.password : "***********"}
                    </Text>
                    <CloseButton
                        icon={
                            isPasswordVisible ? (
                                <IconEyeOff onClick={() => setIsPasswordVisible(false)} />
                            ) : (
                                <IconEye onClick={() => setIsPasswordVisible(true)} />
                            )
                        }
                    />
                </Group>
            </Stack>
        </>
    );
};
