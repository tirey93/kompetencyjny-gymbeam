import { I18nextProvider } from "react-i18next";
import { Outlet } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import { apiClient } from "./common/apiClient";
import { i18n } from "./common/i18n/i18n";
import { ThemeProvider } from "./common/theme";

export const AppProvider = () => {
    return (
        <QueryClientProvider client={apiClient}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <ModalsProvider>
                        <Notifications />
                        <Outlet />
                    </ModalsProvider>
                </ThemeProvider>
            </I18nextProvider>
        </QueryClientProvider>
    );
};
