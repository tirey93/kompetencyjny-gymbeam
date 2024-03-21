import i18next from "i18next";

import { en } from "./translations/en";
import { TranslationKey } from "./translations/i18n";
import { pl } from "./translations/pl";

i18next.init({
    interpolation: {
        escapeValue: false,
    },
    lng: "pl",
    resources: {
        en: {
            translation: en,
        },
        pl: {
            translation: pl,
        },
    },
});

export const translate = (translationKey: TranslationKey, params?: Record<string, string | number>) => {
    return i18next.t(translationKey, params);
};
