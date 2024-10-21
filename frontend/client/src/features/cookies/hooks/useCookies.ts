import { useCallback } from "react";

import { useStorage } from "@/hooks/useStorage/useStorage";

const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent-storage-key";

type UseCookies = {
    hasAccepted: boolean;
    accept: () => void;
};

export const useCookies = (): UseCookies => {
    const [hasAccepted, setHasAccepted] = useStorage<boolean>(COOKIE_CONSENT_STORAGE_KEY);

    const accept = useCallback(() => {
        setHasAccepted(true);
    }, []);

    return {
        hasAccepted: Boolean(hasAccepted),
        accept,
    };
};
