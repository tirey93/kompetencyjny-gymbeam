import { useState } from "react";
import { CloseButton, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";

import { Styled } from "../../Registration.styled";
import { RegistrationFormProps } from "../../Registration.types";
import { StepperButtons } from "../StepperButtons/StepperButtons";

export const SubmitForm = ({ onPreviousStep, onNextStep, form }: RegistrationFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Styled.Stack>
            <Title ta="center">Is this correct?</Title>
            <Paper radius="md" withBorder p="lg">
                <Stack align="center" gap="xs">
                    <ThemeIcon radius="100%" size={100} color="secondary">
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
            <StepperButtons onPreviousStep={onPreviousStep} onNextStep={onNextStep} nextLabel="Submit" />
        </Styled.Stack>
    );
};
