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
import { Routes } from "../../../../router/Routes";

const COMMON_NAVIGATION_ITEMS = [{ Icon: IconHome2, label: "Home", route: Routes.ROOT }];

const ADMIN_NAVIGATION_ITEMS = [{ Icon: IconDashboard, label: "Admin Dashboard", route: Routes.ROOT }];

const USER__NAVIGATION_ITEMS = [
    { Icon: IconUser, label: "Account", route: Routes.ROOT },
    { Icon: IconBarbell, label: "Gym Activities", route: Routes.ROOT },
    { Icon: IconQrcode, label: "Gym Pass", route: Routes.ROOT },
];

const GUEST_NAVIGATION_ITEMS = [
    { Icon: IconLogin, label: "Sign in", route: Routes.LOGIN },
    { Icon: IconUserPlus, label: "Sign up", route: Routes.REGISTRATION },
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
                        label="Logout"
                        asyncBeforeRedirect={signOut}
                        route={Routes.LOGIN}
                    />
                </Stack>
            </UserRoleGuard>
        </Stack>
    );
};
