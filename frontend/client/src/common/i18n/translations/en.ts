/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const en: TranslationSource = {
    navigation: {
        labels: {
            home: "Home",
            signIn: "Sign in",
            signOut: "Sign out",
            signUp: "Sign up",
            qr: "Gym Ticket",
            account: "Account",
            activities: "Activities",
            adminDashboard: "Admin Dashboard",
        },
    },
    pages: {
        home: {
            whyUs: {
                title: "Why you should start your journey with us?",
                description:
                    "We have like a thousand good reasons, but it would be hard to scroll while reading all of them, so we have picked some most important ones:",
                awards: {
                    sport2022: "Sport.com - best gym of 2022",
                    sport2023: "Sport.com - best gym of 2023",
                    startups2023: "startupz.com - promising start-ups of 2023",
                },
                cards: {
                    efficiency: {
                        description: "Our reservation system is blazing fast, enroll for an activity just under 60s!",
                        label: "Highly efficient",
                    },
                    customers: {
                        description: "Over 28.000+ people have trusted us already, 98% of them is still with us!",
                        label: "Happy customers",
                    },
                    privacy: {
                        description: "We won't share your data with any third party. We value your trust.",
                        label: "No third parties",
                    },
                },
            },
            heroBanner: {
                title: {
                    firstLine: "Modern approach",
                    secondLine: "to",
                    highlighted: "sport activities",
                },
                description:
                    "Keeping a healthy lifestyle is simpler than ever; choose from 60+ sport activities in our gym, become an even better version of yourself (although you already are great!).",
                bulletPoints: {
                    variety: {
                        label: "For everyone",
                        description:
                            "choose from variety of available activities, for beginners and battle-tested professionals.",
                    },
                    simplicity: {
                        label: "Simple to use",
                        description:
                            "create an account, enroll for an activity, go to the gym and show your QR code at the gate.",
                    },
                    costs: {
                        label: "No hidden costs",
                        description:
                            "we are 100% transparent with our pricing policy and value customers more than money.",
                    },
                },
                buttons: {
                    learnMore: "Learn more",
                    getStarted: "Get started",
                },
            },
        },

        "404": {
            title: "Nothing to see here",
            description:
                "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.",
            goToHome: "Take me back to home page",
            goBack: "Go back",
        },
        signIn: {
            field: {
                password: {
                    label: "Password",
                    placeholder: "Password",
                },
                login: {
                    label: "Login",
                    placeholder: "Login",
                },
            },

            navigation: {
                signUpLink: "I do not have an account yet.",
                submit: "Sign in",
            },

            header: {
                preEmphasis: "Happy to see",
                emphasised: "you",
                postEmphasis: "back!",
            },
        },

        registration: {
            field: {
                confirmPassword: {
                    label: "Confirm password",
                    placeholder: "Confirm your password",
                    validation: { noMatch: "Passwords have to match." },
                },
                login: {
                    label: "Login",
                    placeholder: "Enter your login",
                    validation: { tooLong: "Up to {{length}} characters.", tooShort: "Minimum {{length}} characters." },
                },
                name: {
                    label: "Name",
                    placeholder: "Enter your display name",
                    validation: { tooLong: "Up to {{length}} characters.", tooShort: "Minimum {{length}} characters." },
                },
                password: {
                    label: "Password",
                    placeholder: "Enter your password",
                    validation: {
                        noSpecialCharacters: "At least 1 special character.",
                        tooLong: "Up to {{length}} characters.",
                        tooShort: "Minimum {{length}} characters.",
                    },
                },
            },
            header: {
                preEmphasis: "Nice to meet",
                emphasised: "you",
                postEmphasis: "",
                defaultName: "pal",
            },
            navigation: { nextStep: "Next", previousStep: "Back", submit: "Submit", signInLink: "I want to sign in." },
            steps: {
                passwords: { description: "Password", label: "Almost there..." },
                personalDetails: { description: "Personal details", label: "Let's introduce!" },
                summary: {
                    description: "Confirmation",
                    label: "Everything set!",
                    header: "Is this data correct?",
                    login: "Login",
                    password: "Password",
                },
            },
        },
    },
};
