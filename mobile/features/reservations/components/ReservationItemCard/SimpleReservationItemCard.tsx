import React from "react";
import { Calendar, Clock, User } from "@tamagui/lucide-icons";

import { ReservationItemCardStyled } from "@/features/reservations/components/ReservationItemCard/styles";
import { Reservation } from "@/types";

const ICON_SIZE = 16;

type SimpleReservationItemCardProps = {
    reservation: Reservation;
};

// No time to unify this component with ReservationItemCard
export const SimpleReservationItemCard = ({ reservation }: SimpleReservationItemCardProps) => {
    const startTime = new Date(reservation.startTime);
    const endTime = new Date(startTime.getTime() + reservation.duration * 60000);

    return (
        <ReservationItemCardStyled.Card>
            <ReservationItemCardStyled.HeaderRow>
                <ReservationItemCardStyled.TitleText>{reservation.activityName}</ReservationItemCardStyled.TitleText>
            </ReservationItemCardStyled.HeaderRow>

            <ReservationItemCardStyled.DetailsContainer>
                <ReservationItemCardStyled.DetailsColumn>
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
