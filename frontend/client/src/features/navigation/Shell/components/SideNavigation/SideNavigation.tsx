import { Center, Divider, Stack } from "@mantine/core";

import { NavigationSection } from "./components/NavigationSection";
import { useSideNavigationItems } from "./hooks/useSideNavigationItems";
import { UserRoleGuard } from "../../../../../common/auth/components/UserRoleGuard";
import { Logo } from "../../../../../common/components/Logo/Logo";

type SideNavigationProps = {
    onNavigate?: () => unknown;
};

export const SideNavigation = ({ onNavigate }: SideNavigationProps) => {
    const { qr, signOut, signIn, signUp, home, adminDashboard, activities } = useSideNavigationItems();

    return (
        <Stack component="nav" align="center" h="100%">
            <Stack gap={0}>
                <Center pt="md">
                    <Logo logoSize={65} />
                </Center>

                <NavigationSection onNavigate={onNavigate} tiles={[home]} />

                <UserRoleGuard allowedRoles={["Admin", "User"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[activities, qr]} />
                </UserRoleGuard>

                <UserRoleGuard allowedRoles={["Admin"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[adminDashboard]} />
                </UserRoleGuard>
            </Stack>

            <Divider mt="auto" />
            <UserRoleGuard allowedRoles={["Guest"]}>
                <NavigationSection onNavigate={onNavigate} tiles={[signIn, signUp]} />
            </UserRoleGuard>
            <UserRoleGuard allowedRoles={["Admin", "User"]}>
                <NavigationSection onNavigate={onNavigate} tiles={[signOut]} />
            </UserRoleGuard>
        </Stack>
    );
};
