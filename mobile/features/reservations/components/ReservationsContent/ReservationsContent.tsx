import { ActivityInstance } from "@/types";
import { ReservationsList } from "../ReservationsList/ReservationsList";
import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { ReservationsContentStyled } from "./styles";
import { Link } from "expo-router";
import { Screens } from "@/constants/Screens";

export const ReservationsContent = ({
    activitiesInstances,
    onRemoveReservation,
}: {
    activitiesInstances?: ActivityInstance[] | null;
    onRemoveReservation: (reservationId: number) => void;
}) => {
    if (activitiesInstances?.length) {
        return (
            <ReservationsList
                reservations={activitiesInstances}
                onRemoveReservation={onRemoveReservation}
            />
        );
    }

    return (
        <ScreenContainer>
            <ReservationsContentStyled.View>
                <ReservationsContentStyled.HeaderText>
                    Nothing to display.
                </ReservationsContentStyled.HeaderText>
                <ReservationsContentStyled.SubText>
                    You don't have any pending reservations right now.
                </ReservationsContentStyled.SubText>
                <Link href={Screens.Activities} asChild>
                    <ReservationsContentStyled.Button>
                        <ReservationsContentStyled.ButtonText>
                            See available activities +
                        </ReservationsContentStyled.ButtonText>
                    </ReservationsContentStyled.Button>
                </Link>
            </ReservationsContentStyled.View>
        </ScreenContainer>
    );
};
