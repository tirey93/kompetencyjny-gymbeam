import { useNavigate } from "react-router-dom";
import { Anchor, Button, Group, Stack } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
import { Routes } from "../../../../../router/Routes";
import { RegistrationFormWrapperProps } from "../FormWrapper/RegistrationFormWrapper";

type StepperButtonsProps = Pick<RegistrationFormWrapperProps, "onPreviousStep" | "onNextStep"> & {
    nextLabel?: string;
    previousLabel?: string;
};

export const RegistrationFormFooter = ({
    onPreviousStep,
    onNextStep,
    nextLabel,
    previousLabel,
}: StepperButtonsProps) => {
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
