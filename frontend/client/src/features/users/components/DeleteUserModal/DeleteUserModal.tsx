import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { ErrorMessage } from "@/components/DataDisplay";
import { Modal } from "@/components/Modals";
import { useDeleteUser, UserShortInfo } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

type DeleteUserModalProps = ContextModalProps<{
    user: User;
}>;

export const DeleteUserModal = ({ innerProps: { user }, id }: DeleteUserModalProps) => {
    const translate = useTranslate();
    const { deleteUser, error, reset, isLoading } = useDeleteUser();

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

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
            <Modal.Title>{translate("modals.user.delete.title")}</Modal.Title>
            <Modal.Caption>{translate("modals.user.delete.caption")}</Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer
                isLoading={isLoading}
                cancelButton={{
                    children: translate("modals.user.delete.buttons.cancel"),
                    onClick: onClose,
                }}
                submitButton={{
                    color: "danger",
                    children: translate("modals.user.delete.buttons.confirm"),
                    onClick: handleDeleteUser,
                }}
            />
        </Modal.Wrapper>
    );
};
