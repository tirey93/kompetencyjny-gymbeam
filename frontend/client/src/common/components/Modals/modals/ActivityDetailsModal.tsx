import { useCallback } from "react";
import { Stack } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";

import { useActivities } from "../../../activities";
import { Modal } from "..";

type ActivityDetailsModalProps = ContextModalProps<{
    activityId: number;
}>;

export const ActivityDetailsModal = ({ innerProps: { activityId } }: ActivityDetailsModalProps) => {
    const { activities } = useActivities();
    const activity = activities?.find((activity) => activity.id === activityId) ?? activities?.[0]; // TODO: Hubert - handle case when activity is not found (shouldn't happen tho)

    const onClose = useCallback(() => {
        modals.closeAll();
    }, []);

    return (
        <Modal.Wrapper>
            <Modal.Title>Activity Details</Modal.Title>
            <Modal.Body>{activity && <Stack>{activity.name}</Stack>}</Modal.Body>
            <Modal.Footer
                cancelButton={{
                    onClick: onClose,
                    children: "Close",
                }}
            />
        </Modal.Wrapper>
    );
};
