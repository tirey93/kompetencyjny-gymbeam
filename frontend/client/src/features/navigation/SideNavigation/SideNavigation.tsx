import { Center, Divider, Stack } from "@mantine/core";

import { NavigationSection } from "./components/NavigationSection";
import { useSideNavigationItems } from "./hooks/useSideNavigationItems";
import { UserRoleGuard } from "../../../common/auth";
import { Logo } from "../../../common/components/Logo";
import { SettingsMenu } from "../../../common/components/SettingsMenu/SettingsMenu";

import classes from "./SideNavigation.module.scss";

type SideNavigationProps = {
    onNavigate?: () => unknown;
};

export const SideNavigation = ({ onNavigate }: SideNavigationProps) => {
    const { qr, signOut, signIn, signUp, home, usersDashboard, activitiesDashboard, activities, reservations, legal } =
        useSideNavigationItems();

    return (
        <Stack component="nav" className={classes.sideNavigationContainer}>
            <Stack className={classes.sectionWrapper}>
                <Center className={classes.logoWrapper}>
                    <Logo logoSize={65} variant="gradient" />
                </Center>

                <NavigationSection onNavigate={onNavigate} tiles={[home, legal]} />

                <UserRoleGuard allowedRoles={["Admin", "User"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[activities, reservations, qr]} />
                </UserRoleGuard>

                <UserRoleGuard allowedRoles={["Admin"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[activitiesDashboard, usersDashboard]} />
                </UserRoleGuard>
            </Stack>

            <Stack className={classes.sectionWrapper}>
                <UserRoleGuard allowedRoles={["Guest"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[signIn, signUp]} />
                </UserRoleGuard>
                <UserRoleGuard allowedRoles={["Admin", "User"]}>
                    <NavigationSection onNavigate={onNavigate} tiles={[signOut]} />
                </UserRoleGuard>

                <Divider className={classes.divider} />
                <SettingsMenu />
            </Stack>
        </Stack>
    );
};
