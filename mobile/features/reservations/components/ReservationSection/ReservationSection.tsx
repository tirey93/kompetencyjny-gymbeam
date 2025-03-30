import React from "react";
import { ActivityInstance } from "@/types";
import { ReservationItemCard } from "@/features/reservations";
import { ReservationSectionStyled } from "./styles";

export const ReservationSection = ({
    items,
    label,
    onRemoveReservation,
    onShowDetails
}: {
    items: ActivityInstance[];
    label: string;
    onRemoveReservation?: (reservationId: number) => void;
    onShowDetails?: (activityId: number) => void;
}) => (
    <ReservationSectionStyled.Container>
        <ReservationSectionStyled.Header>
            <ReservationSectionStyled.Divider />
            <ReservationSectionStyled.LabelText>
                {label}
            </ReservationSectionStyled.LabelText>
            <ReservationSectionStyled.Divider />
        </ReservationSectionStyled.Header>

        <ReservationSectionStyled.Content>
            {items.map((item) => (
                <ReservationItemCard
                    key={`${item.activityId}-${item.startTime}`}
                    reservation={item}
                    onDismiss={onRemoveReservation && item.reservationId
                        ? () => onRemoveReservation(item.reservationId!)
                        : undefined
                    }
                    onShowDetails={onShowDetails
                        ? () => onShowDetails(item.activityId)
                        : undefined
                    }
                />
            ))}
        </ReservationSectionStyled.Content>
    </ReservationSectionStyled.Container>
);