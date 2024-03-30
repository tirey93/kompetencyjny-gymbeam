import { PropsWithChildren } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Footer, LanguageSelect, SideNavigation } from "./components";

const NAVIGATION_HEADER_HEIGHT = 60;
const NAVIGATION_FOOTER_HEIGHT = 80;
export const NAVIGATION_SHELL_TOTAL_HEIGHT = NAVIGATION_HEADER_HEIGHT + NAVIGATION_FOOTER_HEIGHT;

export const AppNavigation = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false);

    return (
        <AppShell
            withBorder={false}
            layout="alt"
            header={{ height: NAVIGATION_HEADER_HEIGHT }}
            footer={{ height: NAVIGATION_FOOTER_HEIGHT }}
            navbar={{ width: 100, breakpoint: "sm", collapsed: { desktop: false, mobile: !isNavbarVisible } }}
        >
            <AppShell.Header p="md">
                <Group w="100%" justify="flex-end">
                    <Burger opened={isNavbarVisible} mr="auto" hiddenFrom="sm" onClick={toggleNavbar} size="sm" />
                    <LanguageSelect />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" withBorder>
                <SideNavigation onNavigate={closeNavbar} />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};
