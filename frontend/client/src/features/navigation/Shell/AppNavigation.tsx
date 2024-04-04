import { PropsWithChildren } from "react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Footer, SideNavigation } from "./components";

import classes from "./AppNavigation.module.scss";

const NAVIGATION_FOOTER_HEIGHT = 80;
export const NAVIGATION_SHELL_TOTAL_HEIGHT = NAVIGATION_FOOTER_HEIGHT;

export const AppNavigation = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false);

    return (
        <AppShell
            withBorder={false}
            layout="alt"
            footer={{ height: NAVIGATION_FOOTER_HEIGHT }}
            navbar={{ width: 100, breakpoint: "sm", collapsed: { desktop: false, mobile: !isNavbarVisible } }}
        >
            <Burger className={classes.burger} opened={isNavbarVisible} onClick={toggleNavbar} hiddenFrom="sm" />

            <AppShell.Navbar className={classes.appNavigationNavbar} withBorder>
                <SideNavigation onNavigate={closeNavbar} />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>

            <AppShell.Footer className={classes.appNavigationFooter}>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};
