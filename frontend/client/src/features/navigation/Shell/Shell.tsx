import { PropsWithChildren } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { LanguageSelect } from "./components/LanguageToggle/LanguageSelect";
import { SideNavigation } from "./components/SideNavigation/SideNavigation";

export const NavigationShell = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar }] = useDisclosure(false);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 100, breakpoint: "sm", collapsed: { desktop: false, mobile: !isNavbarVisible } }}
        >
            <AppShell.Header p="md">
                <Group w="100%" justify="flex-end">
                    <Burger opened={isNavbarVisible} mr="auto" hiddenFrom="sm" onClick={toggleNavbar} size="sm" />
                    <LanguageSelect />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <SideNavigation />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
