import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails } from "../../../../../../../common/auth";
import { ErrorMessage } from "../../../../../../../common/components/DataDisplay";
import { Modal } from "../../../../../../../common/components/Modals";
import { UserShortInfo } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { useChangeReservationsPermission } from "../../hooks";

type ChangeUserReservationPermissionsModalProps = ContextModalProps<{
    user: UserDetails;
}>;

export const ChangeUserReservationPermissionsModal = ({
    innerProps: { user },
}: ChangeUserReservationPermissionsModalProps) => {
    const translate = useTranslate();
    const { changeReservationsPermission, error, reset } = useChangeReservationsPermission();

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

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
        onClose();
    }, [changeReservationsPermission, onClose, translate, user.id, user.reservationDisabled]);

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("pages.adminDashboard.usersPanel.modals.toggleReservations.title")}</Modal.Title>
            <Modal.Caption>
                {user.reservationDisabled
                    ? translate("pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOnCaption")
                    : translate("pages.adminDashboard.usersPanel.modals.toggleReservations.toggleOffCaption")}
            </Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer onSubmit={handleChangePermissions} onCancel={onClose} />
        </Modal.Wrapper>
    );
};
