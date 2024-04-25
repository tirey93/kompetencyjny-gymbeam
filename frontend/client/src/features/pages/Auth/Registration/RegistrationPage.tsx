import { useMemo } from "react";
import { Stack, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { useRegistrationFormNavigation } from "./hooks/useRegistrationFormNavigation";
import { useSignUp } from "../../../../common/auth";
import { useTranslate } from "../../../../common/i18n";
import { NameForm, PasswordForm, RegistrationFormWrapper, SubmitForm } from "./components";

import classes from "./RegistrationPage.module.scss";

export const RegistrationPage = () => {
    const verboseSteps = useMediaQuery("(min-width: 60em)");
    const { form, validatedRules } = useRegistrationForm();
    const { signUp, error, reset } = useSignUp();
    const {
        onNextStepPasswordForm,
        onNextStepNameForm,
        submitRegistrationForm,
        canSelectStep,
        goToPreviousStep,
        step,
        setStep,
    } = useRegistrationFormNavigation({ onSubmit: signUp, registrationForm: form });
    const translate = useTranslate();

    const signUpErrorProps = useMemo(
        () =>
            error
                ? {
                      signUpError: error,
                      clearSignUpError: reset,
                  }
                : undefined,
        [error, reset]
    );

    return (
        <Stack className={classes.container}>
            <Stepper active={step} onStepClick={setStep} color="success">
                <Stepper.Step
                    label={verboseSteps ? translate("pages.registration.steps.personalDetails.label") : ""}
                    description={verboseSteps ? translate("pages.registration.steps.personalDetails.description") : ""}
                    allowStepSelect={canSelectStep(0)}
                >
                    <RegistrationFormWrapper userName={form.values.name} onNextStep={onNextStepNameForm}>
                        <NameForm form={form} rules={validatedRules} onSubmit={onNextStepNameForm} />
                    </RegistrationFormWrapper>
                </Stepper.Step>

                <Stepper.Step
                    label={verboseSteps ? translate("pages.registration.steps.passwords.label") : ""}
                    description={verboseSteps ? translate("pages.registration.steps.passwords.description") : ""}
                    allowStepSelect={canSelectStep(1)}
                >
                    <RegistrationFormWrapper
                        userName={form.values.name}
                        onPreviousStep={goToPreviousStep}
                        onNextStep={onNextStepPasswordForm}
                    >
                        <PasswordForm form={form} rules={validatedRules} onSubmit={onNextStepPasswordForm} />
                    </RegistrationFormWrapper>
                </Stepper.Step>

                <Stepper.Step
                    label={verboseSteps ? translate("pages.registration.steps.summary.label") : ""}
                    description={verboseSteps ? translate("pages.registration.steps.summary.description") : ""}
                    allowStepSelect={canSelectStep(2)}
                >
                    <RegistrationFormWrapper
                        errorProps={signUpErrorProps}
                        userName={form.values.name}
                        onPreviousStep={goToPreviousStep}
                        onNextStep={submitRegistrationForm}
                    >
                        <SubmitForm form={form} rules={validatedRules} />
                    </RegistrationFormWrapper>
                </Stepper.Step>
            </Stepper>
        </Stack>
    );
};
