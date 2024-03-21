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
                <Button color="secondary" w="45%" variant="default" onClick={onPreviousStep}>
                    {previousLabel ?? "Back"}
                </Button>
            )}
            {onNextStep && (
                <Button
                    variant="gradient"
                    gradient={{ from: "success", to: "secondary", deg: 45 }}
                    w="45%"
                    onClick={onNextStep}
                >
                    {nextLabel ?? "Next"}
                </Button>
            )}
        </Group>
    );
};
