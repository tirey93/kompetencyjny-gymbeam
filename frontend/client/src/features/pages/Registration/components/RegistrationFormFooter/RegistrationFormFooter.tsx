import { useNavigate } from "react-router-dom";
import { Button, Group, Stack } from "@mantine/core";

import { useTranslate } from "../../../../../common/i18n";
import { AppRoute } from "../../../../router";

import classes from "./RegistrationFormFooter.module.scss";

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
        <Stack className={classes.container}>
            <Group className={classes.buttonsContainer}>
                {onPreviousStep && (
                    <Button className={classes.button} variant="default" onClick={onPreviousStep} size="md">
                        {previousLabel ?? translate("pages.registration.navigation.previousStep")}
                    </Button>
                )}
                {onNextStep && (
                    <Button className={classes.button} color="success" size="md" onClick={onNextStep}>
                        {nextLabel ?? translate("pages.registration.navigation.nextStep")}
                    </Button>
                )}
            </Group>
            <Button
                variant="subtle"
                color="info"
                className={classes.signInButton}
                onClick={() => navigate(AppRoute.LOGIN)}
            >
                {translate("pages.registration.navigation.signInLink")}
            </Button>
        </Stack>
    );
};
