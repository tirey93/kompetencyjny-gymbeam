import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";

import { ThemeProvider } from "./common/theme/ThemeProvider";
import { NavigationShell } from "./features/navigation/Shell/Shell";
import { Routes } from "./features/router/Routes";

export const Root = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === Routes.ROOT) {
            navigate(Routes.LOGIN);
        }
    }, [navigate]);

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
