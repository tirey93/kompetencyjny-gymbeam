import { Stack } from "@mantine/core";
import {
    IconBarbell,
    IconDashboard,
    IconHome2,
    IconLogin,
    IconLogout,
    IconQrcode,
    IconUser,
    IconUserPlus,
} from "@tabler/icons-react";

import { NavigationSection } from "./components/NavigationSection";
import { NavigationTile } from "./components/NavigationTile";
import { UserRoleGuard } from "../../../../../common/auth/components/UserRoleGuard";
import { useAuthentication } from "../../../../../common/auth/hooks/useAuthentication";
import { TranslationKey } from "../../../../../common/i18n/translations/i18n";
import { Routes } from "../../../../router/Routes";

type NavigationItem = {
    Icon: typeof IconDashboard;
    labelTranslationKey: TranslationKey;
    route: Routes;
};

const COMMON_NAVIGATION_ITEMS: NavigationItem[] = [
    { Icon: IconHome2, labelTranslationKey: "navigation.labels.home", route: Routes.ROOT },
];

const ADMIN_NAVIGATION_ITEMS: NavigationItem[] = [
    { Icon: IconDashboard, labelTranslationKey: "navigation.labels.adminDashboard", route: Routes.ROOT },
];

const USER__NAVIGATION_ITEMS: NavigationItem[] = [
    { Icon: IconUser, labelTranslationKey: "navigation.labels.account", route: Routes.ROOT },
    { Icon: IconBarbell, labelTranslationKey: "navigation.labels.activities", route: Routes.ROOT },
    { Icon: IconQrcode, labelTranslationKey: "navigation.labels.qr", route: Routes.ROOT },
];

const GUEST_NAVIGATION_ITEMS: NavigationItem[] = [
    { Icon: IconLogin, labelTranslationKey: "navigation.labels.signIn", route: Routes.LOGIN },
    { Icon: IconUserPlus, labelTranslationKey: "navigation.labels.signUp", route: Routes.REGISTRATION },
];

export const SideNavigation = () => {
    const { signOut } = useAuthentication();

    return (
        <Stack component="nav" align="center" h="100%">
            <Stack gap={0}>
                <NavigationSection tiles={COMMON_NAVIGATION_ITEMS} />

                <UserRoleGuard allowedRoles={["Guest"]}>
                    <NavigationSection tiles={GUEST_NAVIGATION_ITEMS} />
                </UserRoleGuard>

                <UserRoleGuard allowedRoles={["Admin", "User"]}>
                    <NavigationSection tiles={USER__NAVIGATION_ITEMS} />
                </UserRoleGuard>

                <UserRoleGuard allowedRoles={["Admin"]}>
                    <NavigationSection tiles={ADMIN_NAVIGATION_ITEMS} />
                </UserRoleGuard>
            </Stack>

            <UserRoleGuard allowedRoles={["Admin", "User"]}>
                <Stack justify="center" gap={0} mt="auto">
                    <NavigationTile
                        Icon={IconLogout}
                        labelTranslationKey="navigation.labels.signOut"
                        asyncBeforeRedirect={signOut}
                        route={Routes.LOGIN}
                    />
                </Stack>
            </UserRoleGuard>
        </Stack>
    );
};
