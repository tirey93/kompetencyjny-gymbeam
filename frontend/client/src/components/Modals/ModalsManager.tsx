import { FC, PropsWithChildren } from "react";
import { ContextModalProps, ModalsProvider } from "@mantine/modals";

// TODO: Replace usage of 'any';
// eslint-disable-next-line
type ModalComponent = FC<ContextModalProps<any>>;

type ModalsManagerProps = PropsWithChildren<{
    modals: {
        toggleUserReservationsPermission: ModalComponent;
        changeUserRole: ModalComponent;
        deleteUser: ModalComponent;
        addActivity: ModalComponent;
        deleteActivity: ModalComponent;
        activityDetails: ModalComponent;
        showReservations: ModalComponent;
    };
}>;

export const ModalsManager = ({ children, modals }: ModalsManagerProps) => {
    return <ModalsProvider modals={modals}>{children}</ModalsProvider>;
};
