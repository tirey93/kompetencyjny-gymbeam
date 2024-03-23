import { PropsWithChildren } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import { LanguageSelect } from "./components/LanguageToggle/LanguageSelect";
import { SideNavigation } from "./components/SideNavigation/SideNavigation";

export const NavigationShell = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar }] = useDisclosure(false);
    const pinned = useHeadroom({ fixedAt: 150 });

    return (
        <AppShell
            header={{ height: 60, collapsed: !pinned }}
            navbar={{ width: 100, breakpoint: "sm", collapsed: { desktop: false, mobile: !isNavbarVisible } }}
            padding="md"
        >
            <AppShell.Header p="md">
                <Burger opened={isNavbarVisible} hiddenFrom="sm" onClick={toggleNavbar} size="sm" />
                <Group ml="auto" w="fit-content">
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
