import { useCallback } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails } from "../../../../../../../common/auth";
import { ErrorMessage } from "../../../../../../../common/components/DataDisplay";
import { UserShortInfo } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { useDeleteUser } from "../../hooks/useDeleteUser";

import sharedClasses from "../UserManagementPanelModals.module.scss";
import classes from "./DeleteUserModal.module.scss";

type DeleteUserModalProps = ContextModalProps<{
    user: UserDetails;
}>;

export const DeleteUserModal = ({ innerProps: { user } }: DeleteUserModalProps) => {
    const translate = useTranslate();
    const { deleteUser, error, reset } = useDeleteUser();

    const handleDeleteUser = useCallback(async () => {
        await deleteUser(user.id);
        notifications.show({
            withBorder: true,
            title: translate("notifications.user.delete.title"),
            message: translate("notifications.user.delete.description", {
                id: user.id,
            }),
            color: "success",
        });
    }, [deleteUser, translate, user.id]);

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

    return (
        <Stack className={sharedClasses.container}>
            <Text className={`${sharedClasses.title} ${classes.title}`}>
                {translate("pages.adminDashboard.usersPanel.modals.delete.title")}
            </Text>

            <Text className={sharedClasses.caption}>
                {translate("pages.adminDashboard.usersPanel.modals.delete.caption")}
            </Text>
            <UserShortInfo user={user} />
            {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}

            <Group className={sharedClasses.buttonsContainer}>
                <Button onClick={onClose} variant="default">
                    {translate("pages.adminDashboard.usersPanel.modals.delete.buttons.cancel")}
                </Button>
                <Button onClick={handleDeleteUser}>
                    {translate("pages.adminDashboard.usersPanel.modals.delete.buttons.confirm")}
                </Button>
            </Group>
        </Stack>
    );
};
