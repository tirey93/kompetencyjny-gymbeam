import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { ErrorMessage } from "@/components/DataDisplay";
import { Modal } from "@/components/Modals";
import { useChangeReservationsPermission, UserShortInfo } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

type ChangeUserReservationPermissionsModalProps = ContextModalProps<{
    user: User;
}>;

export const ChangeUserReservationPermissionsModal = ({
    innerProps: { user },
    id,
}: ChangeUserReservationPermissionsModalProps) => {
    const translate = useTranslate();
    const { changeReservationsPermission, error, reset, isLoading } = useChangeReservationsPermission();

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

    const handleChangePermissions = useCallback(async () => {
        await changeReservationsPermission(user.id, !user.areReservationsForbidden);
        notifications.show({
            withBorder: true,
            title: translate("notifications.user.changeReservationsPermission.title"),
            message: translate("notifications.user.changeReservationsPermission.description", {
                id: user.id,
            }),
            color: "success",
        });
        onClose();
    }, [changeReservationsPermission, onClose, translate, user.id, user.areReservationsForbidden]);

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("modals.user.toggleReservations.title")}</Modal.Title>
            <Modal.Caption>
                {user.areReservationsForbidden
                    ? translate("modals.user.toggleReservations.toggleOnCaption")
                    : translate("modals.user.toggleReservations.toggleOffCaption")}
            </Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer
                isLoading={isLoading}
                cancelButton={{
                    children: translate("modals.user.toggleReservations.buttons.cancel"),
                    onClick: onClose,
                }}
                submitButton={{
                    color: "success",
                    children: translate("modals.user.toggleReservations.buttons.confirm"),
                    onClick: handleChangePermissions,
                }}
            />
        </Modal.Wrapper>
    );
};
