import { useMemo } from "react";
import { IconBarbell, IconDashboard, IconHome2, IconLogin, IconQrcode, IconUserPlus } from "@tabler/icons-react";

import { useAuthentication } from "../../../../../../common/auth/hooks/useAuthentication";
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
    const { signOut: signOutAsync } = useAuthentication();

    return useMemo(
        () => ({
            signIn: { Icon: IconLogin, label: translate("navigation.labels.signIn"), route: Routes.LOGIN },
            signUp: { Icon: IconUserPlus, label: translate("navigation.labels.signUp"), route: Routes.REGISTRATION },
            signOut: {
                Icon: IconUserPlus,
                label: translate("navigation.labels.signOut"),
                route: Routes.REGISTRATION,
                asyncBeforeRedirect: signOutAsync,
            },
            home: { Icon: IconHome2, label: translate("navigation.labels.home"), route: Routes.ROOT },
            adminDashboard: {
                Icon: IconDashboard,
                label: translate("navigation.labels.adminDashboard"),
                route: Routes.ROOT,
            },
            activities: { Icon: IconBarbell, label: translate("navigation.labels.activities"), route: Routes.ROOT },
            qr: { Icon: IconQrcode, label: translate("navigation.labels.qr"), route: Routes.ROOT },
        }),
        [translate]
    );
};
