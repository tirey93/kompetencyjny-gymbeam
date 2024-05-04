import { useCallback } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { Activity, useDeleteActivity } from "../../../activities";
import { useTranslate } from "../../../i18n";
import { ErrorMessage } from "../../DataDisplay";
import { Modal } from "..";

type DeleteActivityModalProps = ContextModalProps<{
    activity?: Activity;
}>;

export const DeleteActivityModal = ({ innerProps: { activity } }: DeleteActivityModalProps) => {
    const translate = useTranslate();

    const { deleteActivity, error, reset, isLoading } = useDeleteActivity();

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

    const handleDeleteActivity = useCallback(async () => {
        if (!activity) {
            return onClose();
        }

        await deleteActivity(activity.id);
        notifications.show({
            withBorder: true,
            title: translate("notifications.activity.delete.title"),
            message: translate("notifications.activity.delete.description", {
                id: activity.id,
            }),
            color: "success",
        });
        onClose();
    }, [activity, deleteActivity, onClose, translate]);

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("modals.activities.delete.header")}</Modal.Title>
            <Modal.Caption>{translate("modals.activities.delete.caption")}</Modal.Caption>
            <Modal.Body>{error && <ErrorMessage onClose={reset}>{error}</ErrorMessage>}</Modal.Body>
            <Modal.Footer
                isLoading={isLoading}
                submitButton={{ children: "Confirm", color: "danger" }}
                onSubmit={handleDeleteActivity}
                onCancel={onClose}
            />
        </Modal.Wrapper>
    );
};
