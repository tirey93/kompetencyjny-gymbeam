import { toast } from "sonner-native";
import { StyledReservationButton } from "./styled";
import { User } from "@/types";
import dayjs from "dayjs";

type ReservationButtonProps = {
    isExpired: boolean;
    hasReachedCapacity: boolean;
    user?: User | null;
    activityDate: Date;
    isAlreadyReserved: boolean;
    onReservation: () => unknown;
    onCancellation: () => unknown;
};

export const ReservationButton = ({
    isExpired,
    hasReachedCapacity,
    user,
    activityDate,
    isAlreadyReserved,
    onReservation,
    onCancellation,
}: ReservationButtonProps) => {
    const isActivityDateValid =
        !!user?.gymPassExpirationTime && dayjs(activityDate).isBefore(user.gymPassExpirationTime);

    const isReservationAllowed = !user?.areReservationsForbidden;

    const handlePress = () => {
        if (isAlreadyReserved) {
            onCancellation();
        } else if (isExpired) {
            toast.error("This activity has already taken place.");
        } else if (!isActivityDateValid) {
            toast.error("You do not have a valid gym pass.");
        } else if (hasReachedCapacity) {
            toast.error("This activity is fully booked.");
        } else if (!isReservationAllowed) {
            toast.error("User is not allowed to place reservations.");
        } else {
            onReservation();
        }
    };

    return (
        <StyledReservationButton.Wrapper>
            <StyledReservationButton.Button onPress={handlePress}>
                {isAlreadyReserved ? "Cancel reservation" : "Reserve"}
            </StyledReservationButton.Button>
        </StyledReservationButton.Wrapper>
    );
};
