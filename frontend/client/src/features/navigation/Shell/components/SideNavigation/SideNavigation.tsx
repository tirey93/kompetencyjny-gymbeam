import { Center, Divider, Stack } from "@mantine/core";

import { NavigationSection } from "./components/NavigationSection";
import { useSideNavigationItems } from "./hooks/useSideNavigationItems";
import { UserRoleGuard } from "../../../../../common/auth/components/UserRoleGuard";
import { Logo } from "../../../../../common/components/Logo/Logo";

export const SideNavigation = () => {
    const { qr, signOut, signIn, signUp, home, adminDashboard, activities } = useSideNavigationItems();

    return (
        <Stack component="nav" align="center" h="100%">
            <Stack gap={0}>
                <Center pt="md">
                    <Logo size="xl" />
                </Center>

                <NavigationSection tiles={[home]} />

                <UserRoleGuard allowedRoles={["Admin", "User"]}>
                    <NavigationSection tiles={[activities, qr]} />
                </UserRoleGuard>

                <UserRoleGuard allowedRoles={["Admin"]}>
                    <NavigationSection tiles={[adminDashboard]} />
                </UserRoleGuard>
            </Stack>

            <Divider mt="auto" />
            <UserRoleGuard allowedRoles={["Guest"]}>
                <NavigationSection tiles={[signIn, signUp]} />
            </UserRoleGuard>
            <UserRoleGuard allowedRoles={["Admin", "User"]}>
                <NavigationSection tiles={[signOut]} />
            </UserRoleGuard>
        </Stack>
    );
};
