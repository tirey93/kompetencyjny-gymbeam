import { useCallback } from "react";
import { modals } from "@mantine/modals";

import { Activity } from "../../../../common/activities/Activities";

type UseActivitiesModalEvents = {
    openAddModal: (activity?: Activity) => unknown;
    openDeleteModal: (activity: Activity) => unknown;
};

export const useActivitiesModalEvents = (): UseActivitiesModalEvents => {
    const openAddModal = useCallback((activity?: Activity) => {
        modals.openContextModal({
            modal: "addActivity",
            centered: true,
            withCloseButton: false,
            innerProps: {
                activity,
            },
        });
    }, []);

    const openDeleteModal = useCallback((activity: Activity) => {
        modals.openContextModal({
            modal: "deleteActivity",
            centered: true,
            withCloseButton: false,
            innerProps: {
                activity,
            },
        });
    }, []);

    return { openAddModal, openDeleteModal };
};
