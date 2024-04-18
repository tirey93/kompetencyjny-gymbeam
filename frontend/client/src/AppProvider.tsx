import { I18nextProvider } from "react-i18next";
import { Outlet } from "react-router-dom";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import { apiClient } from "./common/apiClient";
import { ModalsManager } from "./common/components/ModalsManager";
import { useDateTimeLocale } from "./common/hooks";
import { i18n } from "./common/i18n/i18n";
import { ThemeProvider } from "./common/theme";

import "dayjs/locale/pl.js";
import "dayjs/locale/en.js";

export const AppProvider = () => {
    const { locale } = useDateTimeLocale();

    return (
        <QueryClientProvider client={apiClient}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <DatesProvider settings={{ locale: locale?.toString() }}>
                        <ModalsManager>
                            <Notifications />
                            <Outlet />
                        </ModalsManager>
                    </DatesProvider>
                </ThemeProvider>
            </I18nextProvider>
        </QueryClientProvider>
    );
};
