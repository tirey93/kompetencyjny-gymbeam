/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const pl: TranslationSource = {
    pages: {
        signIn: {
            field: {
                password: {
                    label: "Hasło",
                    placeholder: "Hasło",
                },
                login: {
                    label: "Login",
                    placeholder: "Login",
                },
            },

            navigation: {
                signUpLink: "Nie mam jeszcze konta.",
                submit: "Zaloguj się",
            },

            header: {
                preEmphasis: "Miło",
                emphasised: "Cię",
                postEmphasis: "znowu widzieć",
            },
        },

        registration: {
            field: {
                confirmPassword: {
                    label: "Potwierdź hasło",
                    placeholder: "Potwierdź hasło",
                    validation: { noMatch: "Hasła muszą być takie same." },
                },
                login: {
                    label: "Login",
                    placeholder: "Wpisz swój login",
                    validation: { tooLong: "Do {{length}} znaków.", tooShort: "Minimum {{length}} znaków." },
                },
                name: {
                    label: "Nazwa",
                    placeholder: "Wpisz swoją nazwę",
                    validation: { tooLong: "Do {{length}} znaków.", tooShort: "Minimum {{length}} znaków." },
                },
                password: {
                    label: "Hasło",
                    placeholder: "Wpisz swoje hasło",
                    validation: {
                        noSpecialCharacters: "Co najmniej 1 znak specjalny.",
                        tooLong: "Do {{length}} znaków.",
                        tooShort: "Minimum {{length}} znaków.",
                    },
                },
            },
            header: {
                preEmphasis: "Miło",
                emphasised: "Cię",
                postEmphasis: "poznać",
            },
            navigation: {
                nextStep: "Dalej",
                previousStep: "Wstecz",
                submit: "Wyślij",
                signInLink: "Chcę się zalogować.",
            },
            steps: {
                passwords: { description: "Hasło", label: "Prawie gotowe..." },
                personalDetails: { description: "Dane osobowe", label: "Poznajmy się!" },
                summary: {
                    description: "Podsumowanie",
                    label: "Wszystko gotowe!",
                    header: "Czy te dane są poprawne?",
                    login: "Login",
                    password: "Hasło",
                },
            },
        },
    },
};
