/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const en: TranslationSource = {
    notifications: {
        auth: {
            signedIn: {
                title: "You are now signed in.",
                description: "Good to see you back, {{user}}!",
            },
            signedOut: {
                title: "You have been signed out.",
                description: "See you later!",
            },
            signedUp: {
                title: "Account created successfully.",
                description: "Our journey begins!",
            },
        },
    },
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
        qr: {
            gymPassDetails: {
                owner: "Owner",
                expires: "Expires",
            },
        },

        home: {
            contact: {
                email: "Email",
                address: "Address",
                phone: "Phone",
                title: "Contact information",
            },

            workingHours: {
                monThu: "Monday - Thursday",
                friSat: "Friday - Saturday",
                sun: "Sunday",
                title: "Working hours",
            },

            FAQ: {
                header: "Frequently Asked Questions",
                items: {
                    cancelationPolicy: {
                        question: "How far in advance can I cancel my class registration?",
                        answer: "You can cancel your registration up to 2 hours before the start of the class. However, if you miss this window, don't worry - we understand that things happen, and you're allowed up to 3 late cancellations per month. If you exceed this limit, we'll temporarily block your ability to sign up for classes, but only until the end of the calendar month.",
                    },
                    lateAttendancePenalty: {
                        question: "Is there a penalty for missing classes?",
                        answer: "If you miss classes no more than 3 times per month, there's no penalty. Otherwise, we'll block your ability to sign up for sports classes. However, you'll still have unlimited access to the gym.",
                    },
                    attendanceByProxy: {
                        question: "Can someone else attend the class on my behalf?",
                        answer: "Unfortunately, no. Tickets are personalized, and while we won't actively check if you're attending on someone else's behalf, we kindly ask not to share your tickets with third parties.",
                    },
                    futureActivities: {
                        question: "Are there any plans for new activities?",
                        answer: "Absolutely! We're constantly expanding our offerings. If you have something specific in mind, just reach out to us, and we'll respond as quickly as possible. While we can't guarantee that every suggestion will be implemented, who knows, it might just become the next big hit!",
                    },
                    changingRegistration: {
                        question: "How can I change my class registration to a different time or activity?",
                        answer: "To make changes to your registration, please contact us directly through our mobile app or online platform. Our staff will assist you in making the change according to the available options.",
                    },
                    lateArrivalPolicy: {
                        question: "What happens if I arrive late to a class?",
                        answer: "If you arrive late to a class, please adjust to the ongoing session as quickly as possible. We encourage punctuality to ensure you make the most of the workout time.",
                    },
                    membershipSuspension: {
                        question: "Can I suspend my gym membership temporarily?",
                        answer: "Yes, there is an option to temporarily suspend your membership due to specific life situations such as vacation, illness, etc. Please contact our customer service office for further information on the membership suspension procedure.",
                    },
                    classAccessRestrictions: {
                        question: "Are there any restrictions on attending specific classes based on membership type?",
                        answer: "Yes, some classes may only be available to certain types of memberships or may require an additional fee. We encourage you to check our current class schedule and membership policies.",
                    },
                    technicalSupport: {
                        question:
                            "What should I do if I encounter technical issues with the gym's app or online services?",
                        answer: "If you encounter technical issues, please contact our technical support department. You can also report the issue through the contact form on our website or in person at the club's reception.",
                    },
                },
            },
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
