import { Anchor, Button, Group, Stack } from "@mantine/core";

import { translate } from "../../../../../../common/i18n/i18n";
import { Routes } from "../../../../../router/Routes";
import { RegistrationFormProps } from "../../Registration.types";

type StepperButtonsProps = Pick<RegistrationFormProps, "onPreviousStep" | "onNextStep"> & {
    nextLabel?: string;
    previousLabel?: string;
};

export const RegistrationFormFooter = ({
    onPreviousStep,
    onNextStep,
    nextLabel,
    previousLabel,
}: StepperButtonsProps) => {
    return (
        <Stack>
            <Group justify="center" mt="xl">
                {onPreviousStep && (
                    <Button miw="35%" variant="default" onClick={onPreviousStep} size="md">
                        {previousLabel ?? translate("pages.registration.navigation.previousStep")}
                    </Button>
                )}
                {onNextStep && (
                    <Button
                        variant="gradient"
                        gradient={{ from: "success", to: "primary", deg: 45 }}
                        miw="35%"
                        size="md"
                        onClick={onNextStep}
                    >
                        {nextLabel ?? translate("pages.registration.navigation.nextStep")}
                    </Button>
                )}
            </Group>
            <Anchor ta="center" c="info" href={Routes.LOGIN}>
                {translate("pages.registration.navigation.signInLink")}
            </Anchor>
        </Stack>
    );
};
