import { useCallback, useState } from "react";

type UseCookies = {
    hasAccepted: boolean;
    accept: () => void;
};

export const useCookies = (): UseCookies => { // TODO: Handle properly
    const [hasAccepted, setHasAccepted] = useState(false);

    const accept = useCallback(() => {
        setHasAccepted(true);
    }, []);

     return {
        hasAccepted,
        accept,
     }
};
