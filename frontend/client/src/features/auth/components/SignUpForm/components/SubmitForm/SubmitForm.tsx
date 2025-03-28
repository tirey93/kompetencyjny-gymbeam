import { useState } from "react";
import { Box, CloseButton, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";

import { RegistrationFormProps } from "../../types";

import classes from "./SubmitForm.module.scss";

import { useTranslate } from "@/lib/i18n";

export const SubmitForm = ({ form }: RegistrationFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const translate = useTranslate();

    return (
        <Box className={classes.container}>
            <Text className={classes.summaryHeader}>{translate("pages.registration.steps.summary.header")}</Text>

            <Stack className={classes.summaryDataWrapper}>
                <ThemeIcon className={classes.userIcon} size={100}>
                    <IconUser size={50} />
                </ThemeIcon>

                <Text className={classes.displayName}>{form.values.name}</Text>

                <Text className={classes.userCredentials}>
                    {translate("pages.registration.steps.summary.login")}: {form.values.login}
                </Text>

                <Group>
                    <Text className={classes.userCredentials}>
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
        </Box>
    );
};
