import { useCallback } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails, UserRole } from "../../../../../../../common/auth";
import { ErrorMessage } from "../../../../../../../common/components/DataDisplay";
import { UserShortInfo } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { useChangeUserRole } from "../../hooks/useChangeUserRole";

import sharedClasses from "../UserManagementPanelModals.module.scss";
import classes from "./ChangeUserRoleModal.module.scss";

type ChangeUserRoleModalProps = ContextModalProps<{
    user: UserDetails;
    newRole: UserRole;
}>;

export const ChangeUserRoleModal = ({ innerProps: { user, newRole } }: ChangeUserRoleModalProps) => {
    const translate = useTranslate();
    const translatedRole = newRole === "Admin" ? translate("user.roles.admin") : translate("user.roles.user");
    const { changeRole, error, reset } = useChangeUserRole();

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

    const handleChangeRole = useCallback(async () => {
        await changeRole(user.id, newRole);
        notifications.show({
            withBorder: true,
            title: translate("notifications.user.changeRole.title"),
            message: translate("notifications.user.changeRole.description", {
                id: user.id,
            }),
            color: "success",
        });
        onClose();
    }, [changeRole, newRole, onClose, translate, user.id]);

    return (
        <Stack className={sharedClasses.container}>
            <Text className={`${sharedClasses.title} ${classes.title}`}>
                {translate("pages.adminDashboard.usersPanel.modals.changeRole.title")}
            </Text>

            <Text className={sharedClasses.caption}>
                {translate("pages.adminDashboard.usersPanel.modals.changeRole.caption", { role: translatedRole })}
            </Text>
            <UserShortInfo user={user} />
            {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}

            <Group className={sharedClasses.buttonsContainer}>
                <Button onClick={onClose} variant="default">
                    {translate("pages.adminDashboard.usersPanel.modals.changeRole.buttons.cancel")}
                </Button>
                <Button onClick={handleChangeRole}>
                    {translate("pages.adminDashboard.usersPanel.modals.changeRole.buttons.confirm")}
                </Button>
            </Group>
        </Stack>
    );
};
