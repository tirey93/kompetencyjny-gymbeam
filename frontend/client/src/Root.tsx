import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

import { ThemeProvider } from "./common/theme/ThemeProvider";
import { NavigationShell } from "./features/navigation/Shell/Shell";

export const Root = () => {
    return (
        <ThemeProvider>
            <NavigationShell>
                <Container>
                    <Outlet />
                </Container>
            </NavigationShell>
        </ThemeProvider>
    );
};
