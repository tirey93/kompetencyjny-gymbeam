import { TranslationKey } from "../../i18n/translations/i18n";

export type HttpErrorsTranslationsMap = {
    statusCodesMap: Record<number, TranslationKey>;
    defaultError: TranslationKey;
};

export const mapErrorToErrorTranslationKey = (error: unknown, errorsMap: HttpErrorsTranslationsMap) => {
    const statusCode = (error as { status?: number })?.status ?? null;

    if (statusCode && errorsMap.statusCodesMap[statusCode]) {
        return errorsMap.statusCodesMap[statusCode];
    }

    return errorsMap.defaultError;
};
