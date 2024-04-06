import { useMemo } from "react";
import {
    IconBarbell,
    IconDashboard,
    IconHome2,
    IconLogin,
    IconLogout,
    IconQrcode,
    IconUserPlus,
} from "@tabler/icons-react";

import { useSignOut } from "../../../../../../common/auth";
import { useTranslate } from "../../../../../../common/i18n";
import { AppRoute } from "../../../../../router";

type NavigationItem = {
    Icon: typeof IconDashboard;
    label: string;
    route: AppRoute;
    asyncBeforeRedirect?: () => Promise<unknown>;
};

type UseSideNavigationItems = Record<
    "signIn" | "signUp" | "signOut" | "home" | "adminDashboard" | "activities" | "qr",
    NavigationItem
>;

export const useSideNavigationItems = (): UseSideNavigationItems => {
    const translate = useTranslate();
    const { signOut: signOutAsync } = useSignOut();

    return useMemo(
        () => ({
            home: { Icon: IconHome2, label: translate("navigation.labels.home"), route: AppRoute.ROOT },
            signIn: { Icon: IconLogin, label: translate("navigation.labels.signIn"), route: AppRoute.LOGIN },
            signUp: { Icon: IconUserPlus, label: translate("navigation.labels.signUp"), route: AppRoute.REGISTRATION },
            signOut: {
                Icon: IconLogout,
                label: translate("navigation.labels.signOut"),
                route: AppRoute.LOGIN,
                asyncBeforeRedirect: signOutAsync,
            },
            adminDashboard: {
                Icon: IconDashboard,
                label: translate("navigation.labels.adminDashboard"),
                route: AppRoute.ADMIN_DASHBOARD,
            },
            activities: {
                Icon: IconBarbell,
                label: translate("navigation.labels.activities"),
                route: AppRoute.ACTIVITIES,
            },
            qr: { Icon: IconQrcode, label: translate("navigation.labels.qr"), route: AppRoute.GYM_PASS },
        }),
        [signOutAsync, translate]
    );
};
