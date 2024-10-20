import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import { UseRegistrationForm } from "./useRegistrationForm";

import { request } from "@/api";
import { AppRoute } from "@/app/router";
import { useAppOverlayStore } from "@/components/AppOverlay";
import { useTranslate } from "@/lib/i18n";

type UseRegistrationFormNavigationOptions = {
    registrationForm: UseRegistrationForm["form"];
    onSubmit: (payload: { username: string; password: string; displayName: string }) => Promise<unknown>;
};

export const useRegistrationFormNavigation = ({ registrationForm, onSubmit }: UseRegistrationFormNavigationOptions) => {
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);
    const [step, setStep] = useState(0);
    const translate = useTranslate();
    const navigate = useNavigate();

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
            const isLoginAvailable = await request("CheckUserNameAvailability", {
                urlParams: { username: registrationForm.values.login },
            });
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

    const submitRegistrationForm = useCallback(async () => {
        const { login: username, password, name: displayName } = registrationForm.values;
        await onSubmit({ username, password, displayName });

        notifications.show({
            title: translate("notifications.auth.signedUp.title"),
            message: translate("notifications.auth.signedUp.description"),
            color: "success",
            withBorder: true,
        });
        navigate(AppRoute.ROOT);
    }, [registrationForm.values, navigate, onSubmit, translate]);

    return {
        onNextStepNameForm,
        onNextStepPasswordForm,
        submitRegistrationForm,
        canSelectStep,
        goToPreviousStep,
        step,
        setStep,
    };
};
