import { useState } from "react";
import { CloseButton, Group, Paper, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";

import { RegistrationFormProps } from "../../Registration.types";
import { RegistrationFormFooter } from "../RegistrationFormFooter/RegistrationFormFooter";

export const SubmitForm = ({ onPreviousStep, onNextStep, form }: RegistrationFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <>
            <Paper radius="md" withBorder p="lg" shadow="xl">
                <Text fw={600} mb="xl" ta="center">
                    Is this data correct?
                </Text>

                <Stack align="center" gap="xs">
                    <ThemeIcon radius="100%" size={100} color="primary">
                        <IconUser size={50} />
                    </ThemeIcon>

                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {form.values.name}
                    </Text>

                    <Text ta="center" c="dimmed" fz="md">
                        Login: {form.values.login}
                    </Text>

                    <Group>
                        <Text ta="center" c="dimmed" fz="md">
                            Password: {isPasswordVisible ? form.values.password : "***********"}
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
            </Paper>
            <RegistrationFormFooter onPreviousStep={onPreviousStep} onNextStep={onNextStep} nextLabel="Submit" />
        </>
    );
};
