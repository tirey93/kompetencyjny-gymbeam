import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails } from "../../../auth";
import { useTranslate } from "../../../i18n";
import { ErrorMessage } from "../../DataDisplay";
import { useChangeReservationsPermission, UserShortInfo } from "../../User";
import { Modal } from "..";

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
            <Modal.Title>{translate("modals.user.toggleReservations.title")}</Modal.Title>
            <Modal.Caption>
                {user.reservationDisabled
                    ? translate("modals.user.toggleReservations.toggleOnCaption")
                    : translate("modals.user.toggleReservations.toggleOffCaption")}
            </Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer onSubmit={handleChangePermissions} onCancel={onClose} />
        </Modal.Wrapper>
    );
};
