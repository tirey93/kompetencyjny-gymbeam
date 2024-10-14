import { useCallback, useEffect, useState } from "react";
import { useCookies } from "../../../cookies";

type UseCookiesPopup = {
    close: () => void;
    accept: () => void;
    isOpen: boolean;
};

export const useCookiesPopup = (): UseCookiesPopup => {
    const [isOpen, setIsOpen] = useState(false);
    const { accept, hasAccepted } = useCookies();

    useEffect(() => {
        setIsOpen(!hasAccepted);
    }, [hasAccepted]);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const optimisticAccept = useCallback(() => {
        accept();
        close();
    }, [accept, close]);

    return {
        close,
        accept: optimisticAccept,
        isOpen,
    };
}
