import { useMemo } from "react";
import i18next from "i18next";

import { useTranslate } from "@/lib/i18n";

type UseDateTimeLocale = {
    locale: Intl.LocalesArgument;
};

export const useDateTimeLocale = (): UseDateTimeLocale => {
    const translate = useTranslate();
    const locale = useMemo(() => i18next.language.toLowerCase(), [translate]);
    return { locale };
};
