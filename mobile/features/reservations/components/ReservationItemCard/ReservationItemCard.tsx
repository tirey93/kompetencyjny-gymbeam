import React from "react";
import { View, Text, XStack, YStack, Spinner, styled } from "tamagui";

import { Calendar, Clock, User, Users, X } from "@tamagui/lucide-icons";
import { ActivityInstance } from "@/types";
import { ReservationItemCardStyled } from "./styles";

type ReservationItemCardProps = {
    reservation: ActivityInstance;
    onDismiss?: () => void;
    onShowDetails?: () => void;
    isLoading?: boolean;
};

export const ReservationItemCard = ({
    reservation,
    onDismiss,
    onShowDetails,
    isLoading
}: ReservationItemCardProps) => {
    const startTime = new Date(reservation.startTime);
    const endTime = new Date(startTime.getTime() + reservation.duration * 60000);

    return (
        <ReservationItemCardStyled.Card onPress={onShowDetails}>
            <XStack justifyContent="space-between" alignItems="center" mb="$3">
                <ReservationItemCardStyled.TitleText>
                    {reservation.name}
                </ReservationItemCardStyled.TitleText>
                {isLoading ? (
                    <Spinner size="small" />
                ) : (
                    onDismiss && (
                        <ReservationItemCardStyled.CloseButton onPress={onDismiss}>
                            <ReservationItemCardStyled.CloseButtonInner>
                                <X size={16} color="#ff4d4f" />
                            </ReservationItemCardStyled.CloseButtonInner>
                        </ReservationItemCardStyled.CloseButton>
                    )
                )}
            </XStack>

            <XStack flexWrap="wrap">
                <YStack width="50%" gap="$2" paddingRight="$2">
                    <ReservationItemCardStyled.DetailRow>
                        <Users size={16} color="#FAB565" />
                        <ReservationItemCardStyled.DetailText>
                            {reservation.slotsTaken} / {reservation.totalCapacity} slots
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>

                    <ReservationItemCardStyled.DetailRow>
                        <Calendar size={16} color="#FAB565" />
                        <ReservationItemCardStyled.DetailText>
                            {startTime.toLocaleDateString()}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>
                </YStack>

                <YStack width="50%" gap="$2">
                    <ReservationItemCardStyled.DetailRow>
                        <Clock size={16} color="#FAB565" />
                        <ReservationItemCardStyled.DetailText>
                            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>

                    <ReservationItemCardStyled.DetailRow>
                        <User size={16} color="#FAB565" />
                        <ReservationItemCardStyled.DetailText>
                            {reservation.leaderName}
                        </ReservationItemCardStyled.DetailText>
                    </ReservationItemCardStyled.DetailRow>
                </YStack>
            </XStack>
        </ReservationItemCardStyled.Card>
    );
};