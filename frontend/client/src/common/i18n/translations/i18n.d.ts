export type TranslationSource = {
    pages: {
        "404": {
            title: string;
            description: string;
            goToHome: string;
            goBack: string;
        };

        signIn: {
            field: {
                login: {
                    label: string;
                    placeholder: string;
                };
                password: {
                    label: string;
                    placeholder: string;
                };
            };

            header: {
                preEmphasis: string;
                emphasised: string;
                postEmphasis: string;
            };

            navigation: {
                submit: string;
                signUpLink: string;
            };
        };

        registration: {
            field: {
                password: {
                    validation: {
                        tooShort: string;
                        tooLong: string;
                        noSpecialCharacters: string;
                    };
                    label: string;
                    placeholder: string;
                };
                confirmPassword: {
                    validation: {
                        noMatch: string;
                    };
                    label: string;
                    placeholder: string;
                };
                login: {
                    validation: {
                        tooShort: string;
                        tooLong: string;
                    };
                    label: string;
                    placeholder: string;
                };
                name: {
                    validation: {
                        tooShort: string;
                        tooLong: string;
                    };
                    label: string;
                    placeholder: string;
                };
            };

            navigation: {
                previousStep: string;
                nextStep: string;
                submit: string;
                signInLink: string;
            };

            steps: {
                personalDetails: {
                    label: string;
                    description: string;
                };
                summary: {
                    label: string;
                    description: string;
                    header: string;
                    login: string;
                    password: string;
                };
                passwords: {
                    label: string;
                    description: string;
                };
            };

            header: {
                preEmphasis: string;
                emphasised: string;
                postEmphasis: string;
                defaultName: string;
            };
        };
    };
};

type Leaves<T> = T extends object
    ? { [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}` }[keyof T]
    : never;

export type TranslationKey = Leaves<TranslationSource>;
