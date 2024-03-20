import {AppShell, Burger, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {PropsWithChildren} from "react";
import {NavbarLink} from "./components/NavbarLink/NavbarLink";
import {Routes} from "../../router/Routes";

export const NavigationShell = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !isNavbarVisible } }}
            padding="md"
        >
            <AppShell.Header withBorder={false}>
                <Group h="100%" px="md">
                    <Burger opened={isNavbarVisible} onClick={toggleNavbar} hiddenFrom="sm" size="sm" />
                    <Group style={{ flex: 1, justifyContent: "flex-end" }} ml="xl" visibleFrom="sm">
                        <NavbarLink route={Routes.REGISTRATION} text="Sign up" />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <NavbarLink route={Routes.REGISTRATION} text="Sign up" />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
