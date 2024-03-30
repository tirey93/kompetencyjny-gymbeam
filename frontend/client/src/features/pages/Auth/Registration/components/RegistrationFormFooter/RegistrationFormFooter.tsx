import { useNavigate } from "react-router-dom";
import { Anchor, Button, Group, Stack } from "@mantine/core";

import { useTranslate } from "../../../../../../common/i18n";
import { Routes } from "../../../../../router";

type StepperButtonsProps = {
    onPreviousStep?: () => unknown;
    onNextStep?: () => unknown;
    nextLabel?: string;
    previousLabel?: string;
};

export const RegistrationFormFooter = ({
    onPreviousStep,
    onNextStep,
    nextLabel,
    previousLabel,
}: StepperButtonsProps) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    return (
        <Stack>
            <Group justify="center" mt="xl">
                {onPreviousStep && (
                    <Button miw="35%" variant="default" onClick={onPreviousStep} size="md">
                        {previousLabel ?? translate("pages.registration.navigation.previousStep")}
                    </Button>
                )}
                {onNextStep && (
                    <Button variant="gradient" miw="35%" size="md" onClick={onNextStep}>
                        {nextLabel ?? translate("pages.registration.navigation.nextStep")}
                    </Button>
                )}
            </Group>
            <Anchor ta="center" c="info" onClick={() => navigate(Routes.LOGIN)}>
                {translate("pages.registration.navigation.signInLink")}
            </Anchor>
        </Stack>
    );
};
