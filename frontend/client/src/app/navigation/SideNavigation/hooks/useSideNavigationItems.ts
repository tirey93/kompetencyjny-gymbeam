import { useMemo } from "react";
import {
    IconCalendarEvent,
    IconCoin,
    IconDashboard,
    IconHome2,
    IconListCheck,
    IconLogin,
    IconLogout,
    IconQrcode,
    IconSectionSign,
    IconUserPlus,
    IconUsersGroup,
} from "@tabler/icons-react";

import { AppRoute } from "@/app/router";
import { useSignOut } from "@/features/auth";
import { useTranslate } from "@/lib/i18n";

type NavigationItem = {
    Icon: typeof IconDashboard;
    label: string;
    route: AppRoute;
    asyncBeforeRedirect?: () => Promise<unknown>;
};

type UseSideNavigationItems = Record<
    | "signIn"
    | "signUp"
    | "signOut"
    | "home"
    | "usersDashboard"
    | "activitiesDashboard"
    | "activities"
    | "qr"
    | "reservations"
    | "legal"
    | "payments",
    NavigationItem
>;

export const useSideNavigationItems = (): UseSideNavigationItems => {
    const translate = useTranslate();
    const { signOut: signOutAsync } = useSignOut();

    return useMemo(
        () => ({
            home: { Icon: IconHome2, label: translate("navigation.labels.home"), route: AppRoute.ROOT },
            legal: {
                Icon: IconSectionSign,
                label: translate("navigation.labels.legal"),
                route: AppRoute.LEGAL,
            },
            signIn: { Icon: IconLogin, label: translate("navigation.labels.signIn"), route: AppRoute.LOGIN },
            signUp: { Icon: IconUserPlus, label: translate("navigation.labels.signUp"), route: AppRoute.REGISTRATION },
            signOut: {
                Icon: IconLogout,
                label: translate("navigation.labels.signOut"),
                route: AppRoute.LOGIN,
                asyncBeforeRedirect: signOutAsync,
            },
            usersDashboard: {
                Icon: IconUsersGroup,
                label: translate("navigation.labels.usersDashboard"),
                route: AppRoute.USERS_DASHBOARD,
            },
            activitiesDashboard: {
                Icon: IconDashboard,
                label: translate("navigation.labels.activitiesDashboard"),
                route: AppRoute.ACTIVITIES_DASHBOARD,
            },
            activities: {
                Icon: IconCalendarEvent,
                label: translate("navigation.labels.activities"),
                route: AppRoute.ACTIVITIES,
            },
            reservations: {
                Icon: IconListCheck,
                label: translate("navigation.labels.reservations"),
                route: AppRoute.RESERVATIONS,
            },
            qr: { Icon: IconQrcode, label: translate("navigation.labels.qr"), route: AppRoute.GYM_PASS },
            payments: {
                Icon: IconCoin,
                label: translate("navigation.labels.payments"),
                route: AppRoute.PAYMENTS,
            },
        }),
        [signOutAsync, translate]
    );
};
