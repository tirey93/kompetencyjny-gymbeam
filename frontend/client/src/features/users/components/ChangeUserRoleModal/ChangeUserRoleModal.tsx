import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { ErrorMessage } from "@/components/DataDisplay";
import { Modal } from "@/components/Modals";
import { useChangeUserRole, UserShortInfo } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { User, UserRole } from "@/types";

type ChangeUserRoleModalProps = ContextModalProps<{
    user: User;
    newRole: UserRole;
}>;

export const ChangeUserRoleModal = ({ innerProps: { user, newRole }, id }: ChangeUserRoleModalProps) => {
    const translate = useTranslate();
    const translatedRole = newRole === "Admin" ? translate("user.roles.admin") : translate("user.roles.user");
    const { changeRole, error, reset, isLoading } = useChangeUserRole();

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

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
        <Modal.Wrapper>
            <Modal.Title>{translate("modals.user.changeRole.title")}</Modal.Title>
            <Modal.Caption>{translate("modals.user.changeRole.caption", { role: translatedRole })}</Modal.Caption>

            <Modal.Body>
                <UserShortInfo user={user} />
                {error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer
                isLoading={isLoading}
                cancelButton={{
                    children: translate("modals.user.changeRole.buttons.cancel"),
                    onClick: onClose,
                }}
                submitButton={{
                    color: "success",
                    children: translate("modals.user.changeRole.buttons.confirm"),
                    onClick: handleChangeRole,
                }}
            />
        </Modal.Wrapper>
    );
};
