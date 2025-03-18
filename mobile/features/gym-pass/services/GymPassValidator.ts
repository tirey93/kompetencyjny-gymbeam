import { User } from "@/types";

export class GymPassValidator {
    public static validate(owner: User) {
        return Boolean(
            !owner.areReservationsForbidden &&
                owner.gymPassExpirationTime &&
                owner.gymPassExpirationTime.getTime() > Date.now()
        );
    }
}
