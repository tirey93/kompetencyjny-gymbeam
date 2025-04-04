/* eslint sonarjs/no-duplicate-string: 0 */
import { TranslationSource } from "./i18n";

export const en: TranslationSource = {
    settings: {
        header: "Settings",
        contrast: {
            label: "High contrast",
        },
        language: {
            label: "Language",
            options: {
                polish: "Polish",
                english: "English",
            },
        },
    },

    common: {
        cookies: {
            popup: {
                title: "Allow cookies",
                body: "We need your permission to use cookies. They are required to make the app fully functional and allow us to improve the application with collected metrics. We won't spy on you, we won't collect your personal information. Without cookies, this site may not work as expected.",
                acceptButtonLabel: "Accept all",
                seeTermsAndConditionsButtonLabel: "See Terms & Conditions",
            },
        },
        errorScreen: {
            retry: "Retry",
        },
        table: {
            noResults: {
                title: "Nothing to display.",
                addButton: "Add new",
            },
        },
        weekday: {
            monday: {
                short: "Mon",
                long: "Monday",
            },
            tuesday: {
                short: "Tue",
                long: "Tuesday",
            },
            wednesday: {
                short: "Wed",
                long: "Wednesday",
            },
            thursday: {
                short: "Thu",
                long: "Thursday",
            },
            friday: {
                short: "Fri",
                long: "Friday",
            },
            saturday: {
                short: "Sat",
                long: "Saturday",
            },
            sunday: {
                short: "Sun",
                long: "Sunday",
            },
        },
    },

    modals: {
        reservations: {
            caption: {
                empty: "There are no reservations.",
            },
            title: {
                error: "Oops!",
                default: "Reservations",
            },
            buttons: {
                retry: "Retry",
                close: "Close",
            },
        },
        activities: {
            details: {
                title: {
                    error: "Oops!",
                },
                buttons: {
                    retry: "Retry",
                    close: "Close",
                },
            },
            delete: {
                header: "Delete activity",
                caption:
                    "Are you sure you want to delete this activity? All instances of this activity will be deleted and all reservations will be lost.",
                buttons: {
                    cancel: "Cancel",
                    confirm: "Confirm",
                },
            },
            add: {
                header: {
                    add: "Add activity",
                    edit: "Edit activity",
                },
                buttons: {
                    confirm: "Save",
                    cancel: "Cancel",
                },
                formValidation: {
                    name: {
                        required: "Activity name is required.",
                    },
                    duration: {
                        required: "Duration is required.",
                    },
                    startHour: {
                        required: "Start hour is required.",
                    },
                    totalCapacity: {
                        required: "Capacity is required.",
                    },
                    shortDescription: {
                        required: "Provide a short description of activity.",
                    },
                    dateRange: {
                        required: "Date range is required.",
                    },
                    leaderId: {
                        required: "Choose activity leader.",
                    },
                    days: {
                        required: "Select at least 1 day.",
                    },
                },
            },
        },
        user: {
            delete: {
                buttons: {
                    confirm: "Confirm",
                    cancel: "Cancel",
                },
                title: "Delete user",
                caption: "This action is irreversible! Are you sure you want to delete this user?",
            },
            changeRole: {
                buttons: {
                    confirm: "Confirm",
                    cancel: "Cancel",
                },
                title: "Change user role",
                caption: 'Are you sure you want to change role of this user to "{{role}}"?',
            },
            toggleReservations: {
                buttons: {
                    confirm: "Confirm",
                    cancel: "Cancel",
                },
                title: "Change permissions",
                toggleOnCaption: "Are you sure you want to allow this user to make reservations?",
                toggleOffCaption: "Are you sure you want to prevent this user from making any reservations?",
            },
        },
    },

    activityCalendar: {
        filters: {
            activity: {
                placeholder: "Search for activities",
                notFound: "No results.",
            },
        },
        item: {
            participants: {
                tooltip: "Number of people that already have enrolled: {{slotsTaken}}",
            },
            enrollment: {
                add: {
                    label: "Enroll",
                },
                delete: {
                    label: "Resign",
                },
                disabled: {
                    label: "Can't enroll",
                    tooltip: {
                        tooLate: "This activity has already started.",
                        full: "All slots are taken.",
                        notAllowed: "You are not allowed to enroll.",
                        noGymPass: "Your Gym Pass won't be valid during the start time of this activity.",
                    },
                },
            },
        },
    },

    apiErrors: {
        activitiesInstances: {
            getAll: {
                default: "Failed to retrieve list of enrollments. Something went wrong on our side.",
            },
        },
        activities: {
            getAll: {
                default: "Failed to retrieve list of activities. Something went wrong on our side.",
            },
            getOne: {
                default: "Failed to retrieve activity. Something went wrong on our side.",
            },
            delete: {
                default: "Failed to delete activity. Something went wrong on our side.",
                notFound: "Activity you've tried to delete does not exist anymore.",
            },
            add: {
                default: "Failed to add activity. Something went wrong on our side.",
            },
            update: {
                default: "Failed to update activity. Something went wrong on our side.",
                notFound: "Activity you've tried to update does not exist anymore.",
            },
        },
        reservations: {
            getAll: {
                default: "Failed to get list of reservations. Something went wrong on our side.",
            },
            add: {
                default: "Failed to add a reservation. Something went wrong on our side.",
                forbidden: "You are not allowed to reserve this activity.",
                notFound: "Couldn't find activity you want to reserve.",
            },
            remove: {
                default: "Failed to remove the reservation. Something went wrong on our side.",
                forbidden: "You are not allowed to remove this reservation.",
                notFound: "Reservation you've tried to remove does not exist anymore.",
            },
        },
        user: {
            changeReservationsPermission: {
                default: "Failed to change user's reservations permission, something went wrong on our side.",
                notFound: "User you wanted to modify does not exist.",
            },
            changeRole: {
                default: "Failed to change user's role, something went wrong on our side.",
                notFound: "User you wanted to modify does not exist.",
            },
            delete: {
                default: "Failed to delete user, something went wrong on our side.",
                notFound: "User you wanted to delete does not exist.",
            },
            getAll: {
                default: "Failed to retrieve users data. Something went wrong on our side.",
            },
        },
        auth: {
            signIn: {
                incorrectCredentials: "Incorrect login or password.",
                default: "Something went wrong on our side, can't sign you in.",
            },
            signUp: {
                loginTaken: "Login is already taken. Please choose another one.",
                default: "Failed to create account, something went wrong on our side.",
            },
            signOut: {
                default: "We couldn't sign you out. Please try again.",
            },
        },
        payments: {
            intent: {
                default: "Could not retrieve payment information.",
            },
        },
    },
    notifications: {
        payments: {
            status: {
                loading: {
                    waitingForInitialization: "Loading...",
                    processing: "We are processing your payment.",
                },
                success: {
                    default: "Payment succeeded!",
                },
                warning: {
                    actionRequired: "Additional steps are required. Please check your payment provider.",
                },
                error: {
                    canceled: "Payment canceled.",
                    unknownStatus: "Unknown payment status. Please contact us.",
                    default: "Could not retrieve payment status. Please contact us.",
                },
            },
        },
        activity: {
            delete: {
                title: "Activity deleted.",
                description: "Successfully deleted activity with id: {{id}}.",
            },
            update: {
                title: "Activity updated.",
                description: "Successfully updated activity with id: {{id}}.",
            },
            add: {
                title: "Activity added.",
                description: "Successfully added activity: {{name}}.",
            },
        },
        reservations: {
            add: {
                success: {
                    title: "Reservation added.",
                    description: "Successfully reserved {{activity}} activity.",
                },
                error: {
                    title: "Failed to add reservation.",
                },
            },
            remove: {
                success: {
                    title: "Reservation removed.",
                    description: "Successfully removed reservation of {{activity}} activity.",
                },
                error: {
                    title: "Failed to remove reservation.",
                },
            },
        },
        user: {
            changeReservationsPermission: {
                title: "Reservation permissions change operation successful.",
                description: "Changed reservations permission of user with id {{id}}.",
            },
            changeRole: {
                title: "Role change operation successful.",
                description: "Changed role of user with id {{id}}.",
            },
            delete: {
                title: "User has been deleted.",
                description: "Successfully deleted user with id {{id}}.",
            },
        },
        auth: {
            signedIn: {
                title: "You are now signed in.",
                description: "Good to see you back, {{user}}!",
            },
            signedOut: {
                title: "You have been signed out.",
                description: "See you later!",
            },
            signingOutFailed: {
                title: "Failed to sign you out.",
                description: "Please try again in a while.",
            },
            signedUp: {
                title: "Account created successfully.",
                description: "Our journey begins!",
            },
        },
    },
    navigation: {
        labels: {
            payments: "Payments",
            home: "Home",
            signIn: "Sign in",
            signOut: "Sign out",
            signUp: "Sign up",
            qr: "Gym Ticket",
            account: "Account",
            activities: "Activities",
            usersDashboard: "Users Dashboard",
            activitiesDashboard: "Activities Dashboard",
            reservations: "My reservations",
            legal: "Terms & Conditions",
        },
    },
    user: {
        id: "ID",
        name: "Name",
        login: "Login",
        roles: {
            user: "User",
            admin: "Admin",
        },
    },
    activity: {
        id: "ID",
        name: "Name",
        duration: "Duration",
        capacity: "Slots",
        startTime: "Start time",
        days: "Days",
        period: "Period",
        leader: "Leader",
        description: "Long description",
        summary: "Short description",
    },

    pages: {
        reservations: {
            noResults: {
                description: "You don't have any pending reservations right now.",
                button: "See available activities",
            },
            header: "Your reservations",
            link: "Check our activity calendar",
            sections: {
                today: "Today",
                incoming: "In incoming days",
                others: "Your other reservations",
                empty: "No reservations.",
            },
        },
        activities: {
            details: {
                duration: "Duration",
                capacity: "Max participants",
                leader: "Trainer",
            },
            errorScreen: {
                activities: {
                    title: "Can't display activities.",
                },
                instances: {
                    title: "Can't display activities.",
                },
            },
        },

        activitiesDashboard: {
            tab: "Activities",
            addNewButton: "Add new",
            expired: "This activity has already expired.",
            notStarted: "This activity has not started yet.",
            noResults: {
                description: "There are no existing activities. Add the first one.",
            },
            searchBar: {
                placeholder: "Search for activity",
            },
            header: {
                id: "ID",
                name: "Name",
                startTime: "Start Date",
                endTime: "End Date",
                startHour: "Start Hour",
                duration: "Duration",
                days: "Repeats on",
                totalCapacity: "Capacity",
                leaderName: "Leader",
                longDescription: "Description",
                shortDescription: "Summary",
            },
        },

        usersDashboard: {
            tab: "Users",
            options: {
                delete: "Delete user's account",
                seeReservations: "See reservations",
            },
            search: {
                placeholder: "Search for an user",
            },
            noResults: {
                description: "There are no users' accounts to display, not even yours. Something has gone wrong.",
            },
            header: {
                id: "ID",
                user: "User",
                login: "Login",
                role: "Role",
                reservations: "Reservations",
                options: "Options",
                gymPassExpirationTime: "GymPass",
            },
            rows: {
                reservations: {
                    on: "Enabled",
                    off: "Disabled",
                },
                name: "Name",
                login: "Login",
                gymPassExpirationTime: {
                    label: "Valid until",
                    expired: "Expired",
                },
            },
            errorScreen: {
                title: "Can't display list of users.",
            },
        },

        qr: {
            gymPassDetails: {
                owner: "Owner",
                reservationsPermission: "Account status",
                expired: "Expired",
                expiresAt: "Expires at",
            },
            errors: {
                expired: "Expired",
            },
            orderMembershipButton: {
                label: "Order gym membership",
            },
            extendMembershipButton: {
                label: "Extend gym membership",
            },
        },

        payment: {
            gymMembership: {
                status: {
                    title: {
                        loading: "Waiting for status",
                        success: "Congrats!",
                        warning: "Action required",
                        error: "Payment failed",
                    },
                    buttons: {
                        goBack: {
                            label: "Go back",
                        },
                        goToQR: {
                            label: "See gym pass",
                        },
                    },
                },
                form: {
                    title: "Order gym membership",
                    description:
                        "After confirming your payment, you will receive gym membership for 30 days. If you already have one, it will be extended by 30 days. Refunds are issued after mail contact.",
                    buttons: {
                        goBack: {
                            label: "Go back",
                        },
                        pay: {
                            label: "Pay {{amount}} {{currency}}",
                        },
                    },
                },
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

            oAuth: {
                divider: "Or",
                google: "Continue with Google",
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
                    validation: {
                        tooLong: "Up to {{length}} characters.",
                        tooShort: "Minimum {{length}} characters.",
                        taken: "This login is already taken.",
                        unableToCheckAvailability: "Unable to check login availability. Please try again later, sorry.",
                    },
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

        termsAndConditions: {
            header: "Terms & Conditions",
            generalTerms: {
                title: "General Terms",
                items: {
                    "1": 'The GymBeam App ("App") is owned and operated by GymBeam.',
                    "2": "By downloading, accessing, or using the App, you agree to be bound by these Terms & Conditions.",
                    "3": "We reserve the right to amend these Terms & Conditions at any time. Changes will be posted within the App.",
                },
            },
            gymMembership: {
                title: "Gym Membership",
                items: {
                    "1": "Users may purchase different types of gym memberships through the App.",
                    "2": "Memberships are non-transferable and may not be shared with or used by third parties.",
                    "3": "If you wish to temporarily suspend your membership, please contact our customer service team.",
                },
            },
            classRegistrationAndAttendance: {
                title: "Class Registration and Attendance",
                items: {
                    "1": "Users can register for fitness classes through the App.",
                    "2": "You may cancel your class registration up to 2 hours before the start of the class.",
                    "3": "Missing more than 3 classes in a month will lead to a temporary block on class registration.",
                },
            },
            lateArrivals: {
                title: "Late Arrivals",
                items: {
                    "1": "If you arrive late, you may still join the class with minimal disruption.",
                    "2": "Repeated late arrivals may result in warnings or restrictions.",
                },
            },
            appUsageAndTechnicalSupport: {
                title: "App Usage and Technical Support",
                items: {
                    "1": 'The App is provided on an "as is" basis, and we do not guarantee that it will be available at all times.',
                    "2": "Unauthorized use of the App may result in account termination.",
                },
            },
            accountSuspensionAndTermination: {
                title: "Account Suspension and Termination",
                items: {
                    "1": "We reserve the right to suspend or terminate your account if you violate these Terms & Conditions.",
                    "2": "Suspension may occur due to repeated missed or late-canceled classes, or if you share your account with others.",
                },
            },
            paymentAndRefundPolicy: {
                title: "Payment and Refund Policy",
                items: {
                    "1": "Payments for memberships and class bookings can be made through the App.",
                    "2": "In the event of any billing errors or disputes, contact our customer service team immediately.",
                },
            },
            dataPrivacy: {
                title: "Data Privacy",
                items: {
                    "1": "By using the App, you consent to the collection and processing of your personal data in accordance with our Privacy Policy. All data will be stored for 14 since the day your account is removed.",
                    "2": "We take your privacy seriously and will not share your personal information with third parties without your consent.",
                },
            },
            liabilityDisclaimer: {
                title: "Liability Disclaimer",
                items: {
                    "1": "While we strive to ensure that all information provided in the App is accurate, we do not guarantee its completeness.",
                    "2": "You agree to use the App and participate in gym activities at your own risk.",
                },
            },
            contactInformation: {
                title: "Contact Information",
                items: {
                    "1": "If you have any questions or concerns, please contact us through the App or at support@gymbeam.com.",
                },
            },
        },
    },
};
