import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { useSignUp } from "../../../../common/auth";
import { useTranslate } from "../../../../common/i18n";
import { Routes } from "../../../router";
import { NameForm, PasswordForm, RegistrationFormWrapper, SubmitForm } from "./components";

import classes from "./RegistrationPage.module.scss";

export const RegistrationPage = () => {
    const verboseSteps = useMediaQuery("(min-width: 60em)");
    const { form, validatedRules } = useRegistrationForm();
    const translate = useTranslate();
    const navigate = useNavigate();
    const { signUp, error, reset } = useSignUp();
    const [step, setStep] = useState(0);

    const goToNextStep = useCallback(() => {
        setStep((step) => ++step);
    }, []);

    const goToPreviousStep = useCallback(() => {
        setStep((step) => --step);
    }, []);

    const canSelectStep = useCallback(
        (stepNumber: number) => {
            return stepNumber <= step;
        },
        [step]
    );

    const onNextStepNameForm = useCallback(() => {
        if (!form.validateField("name").hasError && !form.validateField("login").hasError) {
            goToNextStep();
        }
    }, [form, goToNextStep]);

    const onNextStepPasswordForm = useCallback(() => {
        if (!form.validateField("password").hasError && !form.validateField("confirmPassword").hasError) {
            goToNextStep();
        }
    }, [form, goToNextStep]);

    const submitRegistrationForm = useCallback(async () => {
        const { login: name, password, name: displayName } = form.values;
        await signUp({ name, password, displayName });

        notifications.show({
            title: translate("notifications.auth.signedUp.title"),
            message: translate("notifications.auth.signedUp.description"),
            color: "success",
            withBorder: true,
        });
        navigate(Routes.ROOT);
    }, [form.values, navigate, signUp]);

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
                        <NameForm form={form} rules={validatedRules} />
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
                        <PasswordForm form={form} rules={validatedRules} />
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
