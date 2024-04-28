import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { UserDetails } from "../../../../../../../common/auth";
import { ErrorMessage } from "../../../../../../../common/components/DataDisplay";
import { Modal } from "../../../../../../../common/components/Modals";
import { UserShortInfo } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { useDeleteUser } from "../../hooks";

type DeleteUserModalProps = ContextModalProps<{
    user: UserDetails;
}>;

export const DeleteUserModal = ({ innerProps: { user } }: DeleteUserModalProps) => {
    const translate = useTranslate();
    const { deleteUser, error, reset } = useDeleteUser();

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

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
        onClose();
    }, [deleteUser, onClose, translate, user.id]);

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("pages.adminDashboard.usersPanel.modals.delete.title")}</Modal.Title>
            <Modal.Caption>{translate("pages.adminDashboard.usersPanel.modals.delete.caption")}</Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer
                onSubmit={handleDeleteUser}
                onCancel={onClose}
                cancelButton={{
                    color: "danger",
                    children: translate("pages.adminDashboard.usersPanel.modals.delete.buttons.confirm"),
                }}
            />
        </Modal.Wrapper>
    );
};
