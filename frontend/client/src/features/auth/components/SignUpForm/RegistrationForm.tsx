import { useCallback } from "react";
import { Stepper } from "@mantine/core";

import { RegistrationFormWrapper } from "./components/FormWrapper/RegistrationFormWrapper";
import { NameForm } from "./components/NameForm/NameForm";
import { PasswordForm } from "./components/PasswordForm/PasswordForm";
import { SubmitForm } from "./components/SubmitForm/SubmitForm";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { useRegistrationFormNavigation } from "./hooks/useRegistrationFormNavigation";
import { RegistrationFormInputs } from "./types";

import { useTranslate } from "@/lib/i18n";

export type RegistrationFormProps = {
    onSubmit: (input: RegistrationFormInputs) => Promise<void>;
    isVerbose?: boolean;
    error?: string;
    onCloseError: () => void;
};

export const RegistrationForm = ({ onSubmit, onCloseError, error, isVerbose }: RegistrationFormProps) => {
    const translate = useTranslate();
    const { form, validatedRules } = useRegistrationForm();

    const { onNextStepPasswordForm, onNextStepNameForm, canSelectStep, goToPreviousStep, step, setStep } =
        useRegistrationFormNavigation({ registrationForm: form });

    const handleSubmit = useCallback(async () => {
        await onSubmit(form.values);
    }, [form.values, onSubmit]);

    return (
        <Stepper active={step} onStepClick={setStep} color="success">
            <Stepper.Step
                label={isVerbose ? translate("pages.registration.steps.personalDetails.label") : ""}
                description={isVerbose ? translate("pages.registration.steps.personalDetails.description") : ""}
                allowStepSelect={canSelectStep(0)}
            >
                <RegistrationFormWrapper userDisplayName={form.values.name} onNextStep={onNextStepNameForm}>
                    <NameForm form={form} rules={validatedRules} onSubmit={onNextStepNameForm} />
                </RegistrationFormWrapper>
            </Stepper.Step>

            <Stepper.Step
                label={isVerbose ? translate("pages.registration.steps.passwords.label") : ""}
                description={isVerbose ? translate("pages.registration.steps.passwords.description") : ""}
                allowStepSelect={canSelectStep(1)}
            >
                <RegistrationFormWrapper
                    userDisplayName={form.values.name}
                    onPreviousStep={goToPreviousStep}
                    onNextStep={onNextStepPasswordForm}
                >
                    <PasswordForm form={form} rules={validatedRules} onSubmit={onNextStepPasswordForm} />
                </RegistrationFormWrapper>
            </Stepper.Step>

            <Stepper.Step
                label={isVerbose ? translate("pages.registration.steps.summary.label") : ""}
                description={isVerbose ? translate("pages.registration.steps.summary.description") : ""}
                allowStepSelect={canSelectStep(2)}
            >
                <RegistrationFormWrapper
                    errorProps={{
                        signUpError: error,
                        clearSignUpError: onCloseError,
                    }}
                    userDisplayName={form.values.name}
                    onPreviousStep={goToPreviousStep}
                    onNextStep={handleSubmit}
                >
                    <SubmitForm form={form} rules={validatedRules} />
                </RegistrationFormWrapper>
            </Stepper.Step>
        </Stepper>
    );
};
