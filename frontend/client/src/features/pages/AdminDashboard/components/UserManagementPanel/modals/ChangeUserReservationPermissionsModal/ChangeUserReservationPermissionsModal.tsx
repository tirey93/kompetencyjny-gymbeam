import { useCallback } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails } from "../../../../../../../common/auth";
import { ErrorMessage } from "../../../../../../../common/components/DataDisplay";
import { UserShortInfo } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { useChangeReservationsPermission } from "../../hooks/useChangeUserReservationsPermission";

import sharedClasses from "../UserManagementPanelModals.module.scss";
import classes from "./ChangeUserReservationPermissionsModal.module.scss";

type ChangeUserReservationPermissionsModalProps = ContextModalProps<{
    user: UserDetails;
}>;

export const ChangeUserReservationPermissionsModal = ({
    innerProps: { user },
}: ChangeUserReservationPermissionsModalProps) => {
    const translate = useTranslate();
    const { changeReservationsPermission, error, reset } = useChangeReservationsPermission();

    const handleChangePermissions = useCallback(async () => {
        await changeReservationsPermission(user.id, !user.reservationDisabled);
        notifications.show({
            withBorder: true,
            title: translate("notifications.user.changeReservationsPermission.title"),
            message: translate("notifications.user.changeReservationsPermission.description", {
                id: user.id,
            }),
            color: "success",
        });
    }, [changeReservationsPermission, translate, user.id, user.reservationDisabled]);

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

    return (
        <Stack className={sharedClasses.container}>
            <Text className={`${sharedClasses.title} ${classes.title}`}>
                {translate("pages.adminDashboard.usersPanel.modals.toggleReservations.title")}
            </Text>

            <Text className={sharedClasses.caption}>
                {user.reservationDisabled
                    ? translate("pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOnCaption")
                    : translate("pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOffCaption")}
            </Text>
            <UserShortInfo user={user} />
            {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}

            <Group className={sharedClasses.buttonsContainer}>
                <Button onClick={onClose} variant="default">
                    {translate("pages.adminDashboard.usersPanel.modals.toggleReservations.buttons.cancel")}
                </Button>
                <Button onClick={handleChangePermissions}>
                    {translate("pages.adminDashboard.usersPanel.modals.toggleReservations.buttons.confirm")}
                </Button>
            </Group>
        </Stack>
    );
};
