import { useState } from "react";
import { CloseButton, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";

import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";
import { RegistrationFormProps } from "../../Registration";

export const SubmitForm = ({ form }: RegistrationFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const translate = useTranslate();

    return (
        <>
            <Text fw={600} mb="xl" ta="center">
                {translate("pages.registration.steps.summary.header")}
            </Text>

            <Stack align="center" gap="xs">
                <ThemeIcon radius="100%" size={100}>
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
