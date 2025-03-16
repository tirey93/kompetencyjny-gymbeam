export type HttpErrorsMap = {
    statusCodesMap: Record<number, string>;
    defaultError: string;
};

export const mapErrorToErrorMessage = (error: unknown, errorsMap: HttpErrorsMap) => {
    const statusCode = (error as { status?: number })?.status ?? null;

    if (statusCode && errorsMap.statusCodesMap[statusCode]) {
        return errorsMap.statusCodesMap[statusCode];
    }

    return errorsMap.defaultError;
};
