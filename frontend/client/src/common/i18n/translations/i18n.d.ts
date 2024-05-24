export type TranslationSource = {
    common: {
        errorScreen: {
            retry: string;
        };
        table: {
            noResults: {
                title: string;
                addButton: string;
            };
        };
        weekday: {
            monday: {
                short: string;
                long: string;
            };
            tuesday: {
                short: string;
                long: string;
            };
            wednesday: {
                short: string;
                long: string;
            };
            thursday: {
                short: string;
                long: string;
            };
            friday: {
                short: string;
                long: string;
            };
            saturday: {
                short: string;
                long: string;
            };
            sunday: {
                short: string;
                long: string;
            };
        };
    };

    modals: {
        reservations: {
            caption: {
                empty: string;
            };
            title: {
                error: string;
                default: string;
            };
            buttons: {
                retry: string;
                close: string;
            };
        };
        activities: {
            details: {
                title: {
                    error: string;
                };
                buttons: {
                    retry: string;
                    close: string;
                };
            };
            delete: {
                header: string;
                caption: string;
                buttons: {
                    cancel: string;
                    confirm: string;
                };
            };
            add: {
                header: {
                    add: string;
                    edit: string;
                };
                buttons: {
                    confirm: string;
                    cancel: string;
                };
                formValidation: {
                    name: {
                        required: string;
                    };
                    duration: {
                        required: string;
                    };
                    totalCapacity: {
                        required: string;
                    };
                    shortDescription: {
                        required: string;
                    };
                    startHour: {
                        required: string;
                    };
                    dateRange: {
                        required: string;
                    };
                    leaderId: {
                        required: string;
                    };
                    days: {
                        required: string;
                    };
                };
            };
        };
        user: {
            delete: {
                buttons: {
                    confirm: string;
                    cancel: string;
                };
                title: string;
                caption: string;
            };
            changeRole: {
                buttons: {
                    confirm: string;
                    cancel: string;
                };
                title: string;
                caption: string;
            };
            toggleReservations: {
                buttons: {
                    confirm: string;
                    cancel: string;
                };
                title: string;
                toggleOnCaption: string;
                toggleOffCaption: string;
            };
        };
    };

    activityCalendar: {
        filters: {
            activity: {
                placeholder: string;
                notFound: string;
            };
        };
        item: {
            participants: {
                tooltip: string;
            };
            enrollment: {
                add: {
                    label: string;
                };
                delete: {
                    label: string;
                };
                disabled: {
                    label: string;
                    tooltip: {
                        tooLate: string;
                        full: string;
                        notAllowed: string;
                    };
                };
            };
        };
    };

    notifications: {
        activity: {
            delete: {
                title: string;
                description: string;
            };
            update: {
                title: string;
                description: string;
            };
            add: {
                title: string;
                description: string;
            };
        };
        reservations: {
            add: {
                success: {
                    title: string;
                    description: string;
                };
                error: {
                    title: string;
                };
            };
            remove: {
                success: {
                    title: string;
                    description: string;
                };
                error: {
                    title: string;
                };
            };
        };
        user: {
            changeReservationsPermission: {
                title: string;
                description: string;
            };
            changeRole: {
                title: string;
                description: string;
            };
            delete: {
                title: string;
                description: string;
            };
        };
        auth: {
            signedIn: {
                title: string;
                description: string;
            };
            signedOut: {
                title: string;
                description: string;
            };
            signingOutFailed: {
                title: string;
                description: string;
            };
            signedUp: {
                title: string;
                description: string;
            };
        };
    };

    apiErrors: {
        activitiesInstances: {
            getAll: {
                default: string;
            };
        };
        activities: {
            getAll: {
                default: string;
            };
            getOne: {
                default: string;
            };
            delete: {
                default: string;
                notFound: string;
            };
            add: {
                default: string;
            };
            update: {
                default: string;
                notFound: string;
            };
        };
        reservations: {
            getAll: {
                default: string;
            };
            add: {
                default: string;
                forbidden: string;
                notFound: string;
            };
            remove: {
                default: string;
                forbidden: string;
                notFound: string;
            };
        };
        user: {
            changeReservationsPermission: {
                default: string;
                notFound: string;
            };
            changeRole: {
                default: string;
                notFound: string;
            };
            delete: {
                default: string;
                notFound: string;
            };
            getAll: {
                default: string;
            };
        };
        auth: {
            signIn: {
                incorrectCredentials: string;
                default: string;
            };
            signUp: {
                loginTaken: string;
                default: string;
            };
            signOut: {
                default: string;
            };
        };
    };

    navigation: {
        labels: {
            home: string;
            signIn: string;
            signOut: string;
            signUp: string;
            qr: string;
            account: string;
            activities: string;
            usersDashboard: string;
            activitiesDashboard: string;
            reservations: string;
        };
    };

    user: {
        id: string;
        name: string;
        login: string;
        roles: {
            user: string;
            admin: string;
        };
    };

    activity: {
        id: string;
        name: string;
        duration: string;
        capacity: string;
        startTime: string;
        days: string;
        period: string;
        leader: string;
        description: string;
        summary: string;
    };

    pages: {
        reservations: {
            noResults: {
                description: string;
                button: string;
            };
            header: string;
            link: string;
            sections: {
                today: string;
                incoming: string;
                others: string;
                empty: string;
            };
        };
        activities: {
            details: {
                duration: string;
                capacity: string;
                leader: string;
            };
            errorScreen: {
                activities: {
                    title: string;
                };
                instances: {
                    title: string;
                };
            };
        };

        activitiesDashboard: {
            tab: string;
            addNewButton: string;
            expired: string;
            notStarted: string;
            noResults: {
                description: string;
            };
            searchBar: {
                placeholder: string;
            };
            header: {
                id: string;
                name: string;
                startTime: string;
                endTime: string;
                startHour: string;
                duration: string;
                days: string;
                totalCapacity: string;
                leaderName: string;
                longDescription: string;
                shortDescription: string;
            };
        };

        usersDashboard: {
            tab: string;
            options: {
                delete: string;
                seeReservations: string;
            };
            search: {
                placeholder: string;
            };
            noResults: {
                description: string;
            };
            header: {
                id: string;
                user: string;
                login: string;
                role: string;
                reservations: string;
                options: string;
            };
            rows: {
                reservations: {
                    on: string;
                    off: string;
                };
                name: string;
                login: string;
            };
            errorScreen: {
                title: string;
            };
        };

        qr: {
            gymPassDetails: {
                owner: string;
                reservationsPermission: string;
            };
        };

        home: {
            contact: {
                email: string;
                phone: string;
                address: string;
                title: string;
            };

            workingHours: {
                monThu: string;
                friSat: string;
                sun: string;
                title: string;
            };

            FAQ: {
                header: string;
                items: {
                    cancelationPolicy: {
                        question: string;
                        answer: string;
                    };
                    lateAttendancePenalty: {
                        question: string;
                        answer: string;
                    };
                    attendanceByProxy: {
                        question: string;
                        answer: string;
                    };
                    futureActivities: {
                        question: string;
                        answer: string;
                    };
                    changingRegistration: {
                        question: string;
                        answer: string;
                    };
                    lateArrivalPolicy: {
                        question: string;
                        answer: string;
                    };
                    membershipSuspension: {
                        question: string;
                        answer: string;
                    };
                    classAccessRestrictions: {
                        question: string;
                        answer: string;
                    };
                    technicalSupport: {
                        question: string;
                        answer: string;
                    };
                };
            };

            whyUs: {
                title: string;
                description: string;
                awards: {
                    sport2022: string;
                    sport2023: string;
                    startups2023: string;
                };
                cards: {
                    efficiency: {
                        label: string;
                        description: string;
                    };
                    customers: {
                        label: string;
                        description: string;
                    };
                    privacy: {
                        label: string;
                        description: string;
                    };
                };
            };
            heroBanner: {
                title: {
                    firstLine: string;
                    secondLine: string;
                    highlighted: string;
                };
                description: string;
                bulletPoints: {
                    variety: {
                        label: string;
                        description: string;
                    };
                    simplicity: {
                        label: string;
                        description: string;
                    };
                    costs: {
                        label: string;
                        description: string;
                    };
                };
                buttons: {
                    learnMore: string;
                    getStarted: string;
                };
            };
        };

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
                        taken: string;
                        unableToCheckAvailability: string;
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
