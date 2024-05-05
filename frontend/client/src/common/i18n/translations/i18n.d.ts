export type TranslationSource = {
    common: {
        errorScreen: {
            retry: string;
        };
        weekday: {
            monday: {
                short: string;
            };
            tuesday: {
                short: string;
            };
            wednesday: {
                short: string;
            };
            thursday: {
                short: string;
            };
            friday: {
                short: string;
            };
            saturday: {
                short: string;
            };
            sunday: {
                short: string;
            };
        };
    };

    modals: {
        activities: {
            delete: {
                header: string;
                caption: string;
            };
            add: {
                header: {
                    add: string;
                    edit: string;
                };
                buttons: {
                    save: string;
                    cancel: string;
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
                label: string;
                disabled: {
                    label: string;
                    tooltip: {
                        tooLate: string;
                        full: string;
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
            delete: {
                default: string;
            };
            add: {
                default: string;
            };
            update: {
                default: string;
            };
        };
        reservations: {
            add: {
                default: string;
            };
            remove: {
                default: string;
            };
        };
        user: {
            changeReservationsPermission: {
                default: string;
            };
            changeRole: {
                default: string;
            };
            delete: {
                default: string;
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
            };
            search: {
                placeholder: string;
            };
            header: {
                id: string;
                user: string;
                login: string;
                role: string;
                reservations: string;
                options: string;
            };
            retryButton: string;
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
