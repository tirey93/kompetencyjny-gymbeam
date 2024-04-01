/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const pl: TranslationSource = {
    apiErrors: {
        auth: {
            signIn: {
                incorrectCredentials: "Nieprawidłowy login lub hasło.",
                default: "Coś poszło źle po naszej stronie, nie możemy Cię zalogować.",
            },
            signUp: {
                loginTaken: "Ten login jest już zajęty. Prosimy o wybranie innego.",
                default: "Nie udało się stworzyć konta, coś poszło nie tak po naszej stronie.",
            },
            signOut: {
                default: "Nie udało nam się Cię wylogować. Prosimy spróbować ponownie.",
            },
        },
    },
    notifications: {
        auth: {
            signedIn: {
                title: "Zalogowano.",
                description: "Dobrze Cię znowu widzieć, {{user}}!",
            },
            signedOut: {
                title: "Wylogowano.",
                description: "Do później!",
            },
            signingOutFailed: {
                title: "Wylogowanie nie powiodło się",
                description: "Spróbuj ponownie za chwilę.",
            },
            signedUp: {
                title: "Konto zostało założone.",
                description: "Nasza przygoda się zaczyna!",
            },
        },
    },
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
    user: {
        id: "ID",
        name: "Nazwa",
        login: "Login",
        roles: {
            user: "Użytkownik",
            admin: "Administrator",
        },
    },
    pages: {
        adminDashboard: {
            usersPanel: {
                options: {
                    delete: "Usuń konto użytkownika",
                },
                modals: {
                    delete: {
                        buttons: {
                            confirm: "Potwierdź",
                            cancel: "Anuluj",
                        },
                        title: "Usuwanie użytkownika",
                        caption: "Ta akcja jest nieodwracalna! Czy na pewno chcesz usunąć tego użytkownika?",
                    },
                    changeRole: {
                        buttons: {
                            confirm: "Potwierdź",
                            cancel: "Anuluj",
                        },
                        title: "Zmiana roli użytkownika",
                        caption: 'Czy na pewno chcesz zmienić rolę tego użytkownika na "{{role}}"?',
                    },
                    toggleReservations: {
                        buttons: {
                            confirm: "Confirm",
                            cancel: "Cancel",
                        },
                        title: "Zmiana uprawnień do rezerwacji",
                        toggleOnCaption: "Czy na pewno chcesz pozwolić temu użytkownikowi na rezerwowanie zajęć?",
                        toggleOffCaption:
                            "Czy na pewno chcesz zablokować temu użytkownikowi możliwość rezerwacji zajęć?",
                    },
                },
                search: {
                    placeholder: "Wyszukaj użytkownika",
                },
                header: {
                    id: "ID",
                    user: "Użytkownik",
                    login: "Login",
                    role: "Rola",
                    reservations: "Rezerwacje",
                    options: "Opcje",
                },
                rows: {
                    reservations: {
                        on: "Włączone",
                        off: "Wyłączone",
                    },
                    name: "Nazwa",
                    login: "Login",
                },
            },
        },

        qr: {
            gymPassDetails: {
                owner: "Właściciel",
                reservationsPermission: "Uprawnienia do rezerwacji",
            },
        },

        home: {
            contact: {
                email: "Email",
                address: "Lokalizacja",
                phone: "Telefon",
                title: "Informacje kontaktowe",
            },

            workingHours: {
                monThu: "Poniedziałek - Czwartek",
                friSat: "Piątek - Sobota",
                sun: "Niedziela",
                title: "Godziny pracy",
            },

            FAQ: {
                header: "Często Zadawane Pytania",
                items: {
                    cancelationPolicy: {
                        question: "Czy mogę zrezygnować z zajęć?",
                        answer: "Możesz anulować rejestrację najpóźniej na 2 godziny przed rozpoczęciem zajęć. Jednak jeśli przegapisz ten okres, nie martw się - rozumiemy, że różne sytuacje się zdarzają, i masz możliwość do 3 opóźnionych anulowań miesięcznie. Jeśli przekroczysz ten limit, tymczasowo zablokujemy możliwość zapisu na zajęcia, ale tylko do końca bieżącego miesiąca kalendarzowego.",
                    },
                    lateAttendancePenalty: {
                        question: "Czy istnieje kara za spóźnienie się na zajęcia?",
                        answer: "Jeśli opóźniasz się na zajęcia nie więcej niż 3 razy w miesiącu, nie ma kary. W przeciwnym razie, zablokujemy możliwość zapisu na zajęcia sportowe. Niemniej jednak, będziesz mieć w dalszym ciągu nieograniczony dostęp do siłowni.",
                    },
                    attendanceByProxy: {
                        question: "Czy ktoś inny może uczestniczyć w zajęciach w moim imieniu?",
                        answer: "Niestety, nie. Wejściówki są personalizowane, i chociaż nie będziemy aktywnie sprawdzać, czy uczestniczysz w imieniu kogoś innego, uprzejmie prosimy, abyś nie udostępniał swoich wejściówek osobom trzecim.",
                    },
                    futureActivities: {
                        question: "Czy planowane są jakieś nowe zajęcia?",
                        answer: "Oczywiście! Ciągle poszerzamy naszą ofertę. Jeśli masz coś konkretnego na myśli, po prostu skontaktuj się z nami, a odpowiemy tak szybko, jak to możliwe. Mimo że nie możemy zagwarantować, że każda sugestia zostanie zrealizowana, kto wie, może to właśnie stanie się następnym wielkim hitem!",
                    },
                    changingRegistration: {
                        question: "Jak mogę zmienić swoją rejestrację na zajęcia na inny termin lub inną aktywność?",
                        answer: "Aby dokonać zmiany w rejestracji, prosimy o kontakt bezpośrednio za pośrednictwem naszej aplikacji mobilnej lub platformy internetowej. Nasz personel pomoże Ci dokonać zmiany zgodnie z dostępnymi opcjami.",
                    },
                    lateArrivalPolicy: {
                        question: "Co się stanie, jeśli spóźnię się na zajęcia?",
                        answer: "Jeśli spóźnisz się na zajęcia, prosimy o jak najszybsze dostosowanie się do trwającej sesji. Zachęcamy do punktualności, aby jak najlepiej wykorzystać czas treningu.",
                    },
                    membershipSuspension: {
                        question: "Czy mogę tymczasowo zawiesić moje członkostwo w klubie fitness?",
                        answer: "Tak, istnieje możliwość tymczasowego zawieszenia członkostwa z powodu określonych sytuacji życiowych, takich jak wakacje, choroba, itp. Prosimy o kontakt z naszym biurem obsługi klienta w celu uzyskania dalszych informacji na temat procedury zawieszenia członkostwa.",
                    },
                    classAccessRestrictions: {
                        question:
                            "Czy istnieją ograniczenia dotyczące uczestnictwa w konkretnych zajęciach w zależności od rodzaju członkostwa?",
                        answer: "Tak, niektóre zajęcia mogą być dostępne tylko dla określonych typów członkostwa lub mogą wymagać dodatkowej opłaty. Zachęcamy do sprawdzenia naszego aktualnego harmonogramu zajęć i zasad członkostwa.",
                    },
                    technicalSupport: {
                        question:
                            "Co powinienem zrobić, jeśli napotkam problemy techniczne z aplikacją klubową lub usługami online?",
                        answer: "Jeśli napotkasz problemy techniczne, prosimy o kontakt z naszym działem wsparcia technicznego. Możesz również zgłosić problem poprzez formularz kontaktowy na naszej stronie internetowej lub osobiście w recepcji klubu.",
                    },
                },
            },

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
