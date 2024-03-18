import {ThemeProvider} from "./common/theme/ThemeProvider";
import {Outlet} from "react-router-dom";
import {NavigationShell} from "./features/navigation/Shell/Shell";
import {Container} from "@mantine/core";

export const Root = () => {
    return <ThemeProvider>
            <NavigationShell>
                <Container>
                    <Outlet />
                </Container>
            </NavigationShell>
    </ThemeProvider>
}
