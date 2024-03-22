import { useCallback, useState } from "react";
import { Container, Stepper } from "@mantine/core";

import { RegistrationFormWrapper } from "./components/FormWrapper/RegistrationFormWrapper";
import { NameForm } from "./components/NameForm/NameForm";
import { PasswordForm } from "./components/PasswordForm/PasswordForm";
import { SubmitForm } from "./components/SubmitForm/SubmitForm";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { translate } from "../../../../common/i18n/i18n";

export const RegistrationPage = () => {
    const { form, validatedRules } = useRegistrationForm();
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

    const submitRegistrationForm = () => {
        console.log("registration form submitted");
    };

    return (
        <Container maw="800px">
            <Stepper active={step} onStepClick={setStep} radius="xs" color="success">
                <Stepper.Step
                    label={translate("pages.registration.steps.personalDetails.label")}
                    description={translate("pages.registration.steps.personalDetails.description")}
                    allowStepSelect={canSelectStep(0)}
                >
                    <RegistrationFormWrapper userName={form.values.name} onNextStep={onNextStepNameForm}>
                        <NameForm form={form} rules={validatedRules} />
                    </RegistrationFormWrapper>
                </Stepper.Step>
                <Stepper.Step
                    label={translate("pages.registration.steps.passwords.label")}
                    description={translate("pages.registration.steps.passwords.description")}
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
                    label={translate("pages.registration.steps.summary.label")}
                    description={translate("pages.registration.steps.summary.description")}
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
        </Container>
    );
};
