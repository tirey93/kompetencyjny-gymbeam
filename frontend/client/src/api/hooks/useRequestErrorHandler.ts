import { useCallback, useState } from "react";

import { useTranslate } from "@/lib/i18n";
import { TranslationKey } from "@/lib/i18n/translations/i18n";

type UseRequestErrorHandler = {
    setAndTranslateError: (errorKey: TranslationKey) => string;
    error: string | null;
    reset: () => void;
};

export const useRequestErrorHandler = (): UseRequestErrorHandler => {
    const translate = useTranslate();
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setError(null);
    }, []);

    const setAndTranslateError = useCallback(
        (errorKey: TranslationKey) => {
            const translatedError = translate(errorKey);
            setError(translatedError);
            return translatedError;
        },
        [translate]
    );

    return { setAndTranslateError, error, reset };
};
