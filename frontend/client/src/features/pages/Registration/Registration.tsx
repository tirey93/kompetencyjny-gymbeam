import {Container, Stepper} from "@mantine/core";
import {useCallback, useState} from "react";
import {PasswordForm} from "./components/PasswordForm/PasswordForm";
import {NameForm} from "./components/NameForm/NameForm";
import {SubmitForm} from "./components/SubmitForm/SubmitForm";
import {useRegistrationForm} from "./hooks/useRegistrationForm";


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
    }

    const submitRegistrationForm = () => {
        console.log("registration form submitted");
    }

    return <Container>
        <Stepper active={step} onStepClick={setStep} radius="xs" color="success">
            <Stepper.Step label="Let's introduce!" description="Personal details" allowStepSelect={canSelectStep(0)}>
                <NameForm form={form} rules={validatedRules} onNextStep={goToNextStep} />
            </Stepper.Step>
            <Stepper.Step label="Almost there..." description="Password" allowStepSelect={canSelectStep(1)}>
               <PasswordForm form={form} rules={validatedRules} onNextStep={goToNextStep} onPreviousStep={goToPreviousStep} />
            </Stepper.Step>
            <Stepper.Step label="Everything set!" description="Confirmation" allowStepSelect={canSelectStep(2)}>
                <SubmitForm form={form} rules={validatedRules} onPreviousStep={goToPreviousStep} onNextStep={submitRegistrationForm} />
            </Stepper.Step>
            <Stepper.Completed>
                Done
            </Stepper.Completed>
        </Stepper>
    </Container>
}
