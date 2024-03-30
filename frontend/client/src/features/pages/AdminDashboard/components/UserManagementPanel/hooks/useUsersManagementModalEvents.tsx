import { useCallback } from "react";
import { Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { UserDetails, UserRole } from "../../../../../../common/auth";
import { UserShortInfo } from "../../../../../../common/components/User";
import { useTranslate } from "../../../../../../common/i18n";

type UseUsersManagementModalEvents = {
    onUserDelete: (user: UserDetails) => void;
    onUserRoleChange: (user: UserDetails, newRole: Exclude<UserRole, "Guest">) => void;
    onUserReservationsPermissionToggle: (user: UserDetails) => void;
};

export const useUsersManagementModalEvents = (): UseUsersManagementModalEvents => {
    const translate = useTranslate();

    const onUserDelete = useCallback(
        (user: UserDetails) =>
            modals.openConfirmModal({
                padding: "lg",
                confirmProps: {
                    color: "danger",
                },
                title: (
                    <Text c="danger" fw={700}>
                        {translate("pages.adminDashboard.usersPanel.modals.delete.title")}
                    </Text>
                ),
                children: (
                    <Stack>
                        <Text size="sm">{translate("pages.adminDashboard.usersPanel.modals.delete.caption")}</Text>
                        <UserShortInfo user={user} />
                    </Stack>
                ),
                labels: {
                    confirm: translate("pages.adminDashboard.usersPanel.modals.delete.buttons.confirm"),
                    cancel: translate("pages.adminDashboard.usersPanel.modals.delete.buttons.cancel"),
                },
                onConfirm: () => console.log("User deleted"),
            }),
        [translate]
    );

    const onUserRoleChange = useCallback(
        (user: UserDetails, newRole: Exclude<UserRole, "Guest">) => {
            const translatedRole = newRole === "Admin" ? translate("user.roles.admin") : translate("user.roles.user");

            return modals.openConfirmModal({
                padding: "lg",
                title: (
                    <Text c="info" fw={700}>
                        {translate("pages.adminDashboard.usersPanel.modals.changeRole.title")}
                    </Text>
                ),
                children: (
                    <Stack>
                        <Text size="sm">
                            {translate("pages.adminDashboard.usersPanel.modals.changeRole.caption", {
                                role: translatedRole,
                            })}
                        </Text>
                        <UserShortInfo user={user} />
                    </Stack>
                ),
                labels: {
                    confirm: translate("pages.adminDashboard.usersPanel.modals.changeRole.buttons.confirm"),
                    cancel: translate("pages.adminDashboard.usersPanel.modals.changeRole.buttons.cancel"),
                },
                onConfirm: () => console.log("User role changed"),
            });
        },
        [translate]
    );

    const onUserReservationsPermissionToggle = useCallback(
        (user: UserDetails) => {
            const shouldEnableReservations = user.reservationDisabled;

            return modals.openConfirmModal({
                padding: "lg",
                title: (
                    <Text c="info" fw={700}>
                        {translate("pages.adminDashboard.usersPanel.modals.toggleReservations.title")}
                    </Text>
                ),
                children: (
                    <Stack>
                        <Text size="sm">
                            {translate(
                                shouldEnableReservations
                                    ? "pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOnCaption"
                                    : "pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOffCaption"
                            )}
                        </Text>
                        <UserShortInfo user={user} />
                    </Stack>
                ),
                labels: {
                    confirm: translate("pages.adminDashboard.usersPanel.modals.toggleReservations.buttons.confirm"),
                    cancel: translate("pages.adminDashboard.usersPanel.modals.toggleReservations.buttons.cancel"),
                },
                onConfirm: () => console.log("User permission changed"),
            });
        },
        [translate]
    );

    return { onUserDelete, onUserRoleChange, onUserReservationsPermissionToggle };
};
