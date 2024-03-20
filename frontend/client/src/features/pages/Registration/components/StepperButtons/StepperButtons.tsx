import { Button, Group } from "@mantine/core";

import { RegistrationFormProps } from "../../Registration.types";

type StepperButtonsProps = Pick<RegistrationFormProps, "onPreviousStep" | "onNextStep"> & {
    nextLabel?: string;
    previousLabel?: string;
};

export const StepperButtons = ({ onPreviousStep, onNextStep, nextLabel, previousLabel }: StepperButtonsProps) => {
    return (
        <Group justify="center" mt="xl">
            {onPreviousStep && (
                <Button color="secondary" variant="default" onClick={onPreviousStep}>
                    {previousLabel ?? "Back"}
                </Button>
            )}
            {onNextStep && (
                <Button color="secondary" onClick={onNextStep}>
                    {nextLabel ?? "Next"}
                </Button>
            )}
        </Group>
    );
};
