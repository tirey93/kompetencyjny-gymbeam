import { useCallback, useState } from "react";

import { UseRegistrationForm } from "./useRegistrationForm";

import { useAppOverlayStore } from "@/components/AppOverlay";
import { AuthService } from "@/features/auth";
import { useTranslate } from "@/lib/i18n";

type UseRegistrationFormNavigationOptions = {
    registrationForm: UseRegistrationForm["form"];
};

export const useRegistrationFormNavigation = ({ registrationForm }: UseRegistrationFormNavigationOptions) => {
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const [step, setStep] = useState(0);
    const translate = useTranslate();

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

    const checkLoginAvailability = useCallback(async () => {
        try {
            const isLoginAvailable = await AuthService.checkUsernameAvailability(registrationForm.values.login);
            return { isLoginAvailable };
        } catch (error) {
            return { error };
        }
    }, [registrationForm]);

    const onNextStepNameForm = useCallback(async () => {
        if (registrationForm.validateField("name").hasError || registrationForm.validateField("login").hasError) {
            return;
        }

        setIsLoading(true);
        const { isLoginAvailable, error } = await checkLoginAvailability();
        setIsLoading(false);

        if (isLoginAvailable) {
            goToNextStep();
        } else {
            const errorTranslationKey = error
                ? "pages.registration.field.login.validation.unableToCheckAvailability"
                : "pages.registration.field.login.validation.taken";
            registrationForm.setFieldError("login", translate(errorTranslationKey));
        }
    }, [checkLoginAvailability, goToNextStep, registrationForm, setIsLoading, translate]);

    const onNextStepPasswordForm = useCallback(() => {
        if (
            !registrationForm.validateField("password").hasError &&
            !registrationForm.validateField("confirmPassword").hasError
        ) {
            goToNextStep();
        }
    }, [registrationForm, goToNextStep]);

    return {
        onNextStepNameForm,
        onNextStepPasswordForm,
        canSelectStep,
        goToPreviousStep,
        step,
        setStep,
    };
};
