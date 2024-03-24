/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const pl: TranslationSource = {
    navigation: {
        labels: {
            home: "Strona główna",
            signIn: "Logowanie",
            signOut: "Wyloguj",
            signUp: "Rejestracja",
            qr: "Karnet",
            account: "Konto",
            activities: "Zajęcia",
            adminDashboard: "Panel admina",
        },
    },
    pages: {
        home: {
            whyUs: {
                title: "Dlaczego powinniśmy zacząć wspólną przygodę?",
                description:
                    "Mamy właściwie tysiąc dobrych powodów, ale ciężko byłoby je wszystkie przeczytać. Specjalnie dla Ciebie wybraliśmy kilka najważniejszych:",
                awards: {
                    sport2022: "Sport.com - najlepsza siłownia 2022",
                    sport2023: "Sport.com - najlepsza siłownia 2023",
                    startups2023: "startupz.com - obiecujące start-upy 2023",
                },
                cards: {
                    efficiency: {
                        description:
                            "Nasz system rezerwacji jest wyjątkowo szybki, na zajęcia zapiszesz się w mniej niż 60s!",
                        label: "Szybkie zapisy",
                    },
                    customers: {
                        description: "Ponad 28.000+ ludzi, któzy nam zaufali, 98% wciąż jest z nami!",
                        label: "Zadowoleni klienci",
                    },
                    privacy: {
                        description: "Nie udostępnimy Twoich danych nikomu innemu. Cenimy Twoje zaufanie.",
                        label: "Szanujemy prywatność",
                    },
                },
            },
            heroBanner: {
                title: {
                    firstLine: "Nowoczesne podejście",
                    secondLine: "do",
                    highlighted: "zajęć sportowych",
                },
                description:
                    "Zdrowy tryb życia nigdy nie był tak prosty; wybieraj spośród 60+ zajęć sportowych i już jutro zostań lepszą wersją siebie (chociaż już teraz jesteś super!).",
                bulletPoints: {
                    variety: {
                        label: "Dla każdego",
                        description:
                            "nieważne czy jesteś laikiem, czy ultramaratończykiem, u nas znajdziesz coś dla siebie.",
                    },
                    simplicity: {
                        label: "Dziecinnie proste",
                        description:
                            "załóż konto, zapisz się na zajęcia, wygeneruj kod QR przy bramce i zacznij ćwiczyć.",
                    },
                    costs: {
                        label: "Bez ukrytych kosztów",
                        description: "jesteśmy w pełni transparentni, a Ciebie cenimy bardziej od pieniędzy.",
                    },
                },
                buttons: {
                    learnMore: "Dowiedz się więcej",
                    getStarted: "Zaczynajmy",
                },
            },
        },

        "404": {
            title: "Nic tu nie ma",
            description:
                "Strona, którą próbujesz otworzyć, nie istnieje. Być może link wpisany w przeglądarkę jest nieprawidłowy albo strona została przeniesiona pod inny URL.",
            goToHome: "Idź do strony głównej",
            goBack: "Wróć do poprzedniej strony",
        },
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
                postEmphasis: "znowu widzieć!",
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
                defaultName: "ziomeczku",
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
