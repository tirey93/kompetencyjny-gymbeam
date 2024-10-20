import { useCallback, useMemo } from "react";
import { ContextModalProps, modals } from "@mantine/modals";

import classes from "./ReservationsModal.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { Modal } from "@/components/Modals";
import {
    ReservationItemCard,
    ReservationItemCardHeader,
    ReservationsSection,
    useReservations,
} from "@/features/reservations";
import { useTranslate } from "@/lib/i18n";

type ReservationsModalProps = ContextModalProps<
    | {
          type: "ReservationsForUser";
          userId: number;
      }
    | {
          type: "ReservationsForActivity";
          activityId: number;
          startTime: Date;
      }
>;

export const ReservationsModal = ({ innerProps: { ...modalProps }, id }: ReservationsModalProps) => {
    const translate = useTranslate();
    const { reservations, refetch, error, isLoading } = useReservations({
        ...modalProps,
    });

    const reservationItems = useMemo(
        () =>
            reservations?.map((item) => ({
                key: item.id,
                activityId: item.activityId,
                startTime: item.startTime,
                leaderName: item.leaderName,
                reservationId: item.id,
                name:
                    modalProps.type === "ReservationsForUser"
                        ? item.activityName
                        : `${item.userDisplayName} (ID: ${item.userId})`,
            })),
        [modalProps.type, reservations]
    );

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

    if (isLoading) {
        return <Modal.Loader />;
    }

    if (error) {
        return (
            <Modal.Wrapper>
                <Modal.Title>{translate("modals.reservations.title.error")}</Modal.Title>
                <ErrorMessage>{error}</ErrorMessage>

                <Modal.Footer
                    submitButton={{
                        onClick: refetch,
                        children: translate("modals.reservations.buttons.retry"),
                    }}
                    cancelButton={{
                        onClick: onClose,
                        children: translate("modals.reservations.buttons.close"),
                    }}
                />
            </Modal.Wrapper>
        );
    }

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("modals.reservations.title.default")}</Modal.Title>
            <Modal.Body>
                <ReservationsSection
                    items={reservationItems ?? []}
                    onItemRender={({ onShowDetails, ...props }) =>
                        modalProps.type === "ReservationsForUser" ? (
                            <ReservationItemCard {...props} onShowDetails={onShowDetails} />
                        ) : (
                            <ReservationItemCardHeader
                                {...props}
                                header={props.name}
                                className={classes.userReservationItem}
                            />
                        )
                    }
                />
            </Modal.Body>

            <Modal.Footer
                cancelButton={{
                    onClick: onClose,
                    children: translate("modals.reservations.buttons.close"),
                }}
            />
        </Modal.Wrapper>
    );
};
