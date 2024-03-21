import { useCallback, useState } from "react";
import { Container, Stepper } from "@mantine/core";

import { FormWrapper } from "./components/FormWrapper/FormWrapper";
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

    const canSelectStep = (stepNumber: number) => {
        return stepNumber <= step;
    };

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
                    <FormWrapper userName={form.values.name}>
                        <NameForm form={form} rules={validatedRules} onNextStep={goToNextStep} />
                    </FormWrapper>
                </Stepper.Step>
                <Stepper.Step
                    label={translate("pages.registration.steps.passwords.label")}
                    description={translate("pages.registration.steps.passwords.description")}
                    allowStepSelect={canSelectStep(1)}
                >
                    <FormWrapper userName={form.values.name}>
                        <PasswordForm
                            form={form}
                            rules={validatedRules}
                            onNextStep={goToNextStep}
                            onPreviousStep={goToPreviousStep}
                        />
                    </FormWrapper>
                </Stepper.Step>
                <Stepper.Step
                    label={translate("pages.registration.steps.summary.label")}
                    description={translate("pages.registration.steps.summary.description")}
                    allowStepSelect={canSelectStep(2)}
                >
                    <FormWrapper userName={form.values.name}>
                        <SubmitForm
                            form={form}
                            rules={validatedRules}
                            onPreviousStep={goToPreviousStep}
                            onNextStep={submitRegistrationForm}
                        />
                    </FormWrapper>
                </Stepper.Step>
            </Stepper>
        </Container>
    );
};
