import React from "react";
import { Calendar, Clock, User, Users, X } from "@tamagui/lucide-icons";
import { Spinner } from "tamagui";

import { ReservationItemCardStyled } from "./styles";

import { ActivityInstance } from "@/types";

const ICON_SIZE = 16;

type ReservationItemCardProps = {
    reservation: ActivityInstance;
    onDismiss?: (activityId: number) => void;
    onShowDetails?: (activityId: number) => void;
    isLoading?: boolean;
};

export const ReservationItemCard = ({
    reservation,
    onDismiss,
    onShowDetails,
    isLoading,
}: ReservationItemCardProps) => {
    const startTime = new Date(reservation.startTime);
    const endTime = new Date(
        startTime.getTime() + reservation.duration * 60000,
    );

    const onDismissInternal = () => {
        if (!onDismiss) return;
        onDismiss(reservation.activityId);
    };

    const onShowDetailsInternal = () => {
        if (!onShowDetails) return;
        onShowDetails(reservation.activityId);
    };

    return (
        <ReservationItemCardStyled.Card onPress={onShowDetailsInternal}>
            <ReservationItemCardStyled.HeaderRow>
                <ReservationItemCardStyled.TitleText>
                    {reservation.name}
                </ReservationItemCardStyled.TitleText>
                {isLoading ? (
                    <Spinner size="small" />
                ) : (
                    onDismiss && (
                        <ReservationItemCardStyled.CloseButton
                            onPress={onDismissInternal}
                        >
                            <ReservationItemCardStyled.CloseButtonInner>
                                <X size={ICON_SIZE} color="#ff4d4f" />
                            </ReservationItemCardStyled.CloseButtonInner>
                        </ReservationItemCardStyled.CloseButton>
                    )
                )}
            </ReservationItemCardStyled.HeaderRow>

            <ReservationItemCardStyled.DetailsContainer>
                <ReservationItemCardStyled.DetailsColumn>
                    <ReservationItemCardStyled.DetailRow>
                        <Users size={ICON_SIZE} color="orange" />
                        <ReservationItemCardStyled.DetailText>
                            {reservation.slotsTaken} /{" "}
                            {reservation.totalCapacity} slots
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>

                    <ReservationItemCardStyled.DetailRow>
                        <Calendar size={ICON_SIZE} color="orange" />
                        <ReservationItemCardStyled.DetailText>
                            {startTime.toLocaleDateString()}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>
                </ReservationItemCardStyled.DetailsColumn>

                <ReservationItemCardStyled.DetailsColumn>
                    <ReservationItemCardStyled.DetailRow>
                        <Clock size={ICON_SIZE} color="orange" />
                        <ReservationItemCardStyled.DetailText>
                            {startTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {endTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>

                    <ReservationItemCardStyled.DetailRow>
                        <User size={ICON_SIZE} color="orange" />
                        <ReservationItemCardStyled.DetailText>
                            {reservation.leaderName}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>
                </ReservationItemCardStyled.DetailsColumn>
            </ReservationItemCardStyled.DetailsContainer>
        </ReservationItemCardStyled.Card>
    );
};
