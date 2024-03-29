import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { RegistrationFormWrapper } from "./components/FormWrapper/RegistrationFormWrapper";
import { NameForm } from "./components/NameForm/NameForm";
import { PasswordForm } from "./components/PasswordForm/PasswordForm";
import { SubmitForm } from "./components/SubmitForm/SubmitForm";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { useSignUp } from "../../../../common/auth/hooks/useSignUp";
import { useTranslate } from "../../../../common/i18n/hooks/useTranslate";
import { Routes } from "../../../router/Routes";

export const RegistrationPage = () => {
    const verboseSteps = useMediaQuery("(min-width: 60em)");
    const { form, validatedRules } = useRegistrationForm();
    const translate = useTranslate();
    const navigate = useNavigate();
    const { signUp } = useSignUp();
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

    const submitRegistrationForm = async () => {
        const { login: name, password, name: displayName } = form.values;
        await signUp({ name, password, displayName });
        navigate(Routes.ROOT);
    };

    return (
        <Stack maw="800px" mih="800px" m="auto" justify="center" p="xl">
            <Stepper active={step} onStepClick={setStep} radius="xs" color="success">
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
