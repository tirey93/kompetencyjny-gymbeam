import { useCallback } from "react";
import { Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { UserDetails } from "../../../../../../common/auth";
import { UserShortInfo } from "../../../../../../common/components/User";
import { useTranslate } from "../../../../../../common/i18n";

export const useUsersManagementPanelEvents = () => {
    const translate = useTranslate();

    const onUserDelete = useCallback(
        (user: UserDetails) =>
            modals.openConfirmModal({
                centered: true,
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
        []
    );

    return { onUserDelete };
};
