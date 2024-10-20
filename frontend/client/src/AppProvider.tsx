import { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { Outlet } from "react-router-dom";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import "dayjs/locale/pl.js";
import "dayjs/locale/en.js";

import { ModalsManager } from "@/components/Modals";
import { ActivityDetailsModal, AddActivityModal, DeleteActivityModal } from "@/features/activities";
import { ReservationsModal } from "@/features/reservations";
import { ChangeUserReservationPermissionsModal, ChangeUserRoleModal, DeleteUserModal } from "@/features/users";
import { useDateTimeLocale } from "@/hooks";
import { apiClient } from "@/lib/apiClient";
import { i18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const AppProvider = () => {
    const { locale } = useDateTimeLocale();

    const modals = useMemo(
        () => ({
            toggleUserReservationsPermission: ChangeUserReservationPermissionsModal,
            changeUserRole: ChangeUserRoleModal,
            deleteUser: DeleteUserModal,
            addActivity: AddActivityModal,
            deleteActivity: DeleteActivityModal,
            activityDetails: ActivityDetailsModal,
            showReservations: ReservationsModal,
        }),
        []
    );

    return (
        <QueryClientProvider client={apiClient}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <DatesProvider settings={{ locale: locale?.toString() }}>
                        <ModalsManager modals={modals}>
                            <Notifications />
                            <Outlet />
                        </ModalsManager>
                    </DatesProvider>
                </ThemeProvider>
            </I18nextProvider>
        </QueryClientProvider>
    );
};
