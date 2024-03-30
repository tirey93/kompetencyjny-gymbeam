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

import { useSignOut } from "../../../../../../common/auth/hooks/useSignOut";
import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";
import { Routes } from "../../../../../router/Routes";

type NavigationItem = {
    Icon: typeof IconDashboard;
    label: string;
    route: Routes;
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
            signIn: { Icon: IconLogin, label: translate("navigation.labels.signIn"), route: Routes.LOGIN },
            signUp: { Icon: IconUserPlus, label: translate("navigation.labels.signUp"), route: Routes.REGISTRATION },
            signOut: {
                Icon: IconLogout,
                label: translate("navigation.labels.signOut"),
                route: Routes.NA,
                asyncBeforeRedirect: signOutAsync,
            },
            home: { Icon: IconHome2, label: translate("navigation.labels.home"), route: Routes.ROOT },
            adminDashboard: {
                Icon: IconDashboard,
                label: translate("navigation.labels.adminDashboard"),
                route: Routes.ADMIN_DASHBOARD,
            },
            activities: { Icon: IconBarbell, label: translate("navigation.labels.activities"), route: Routes.NA },
            qr: { Icon: IconQrcode, label: translate("navigation.labels.qr"), route: Routes.GYM_PASS },
        }),
        [signOutAsync, translate]
    );
};
