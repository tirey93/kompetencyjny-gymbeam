import { User } from "@/types";

type GymPassPayload = {
    user: User;
    hash: string;
};

export class GymPassEncoder {
    public static encode(user: User): string {
        return JSON.stringify(user);
    }

    public static decode(value: string): User {
        const payload = JSON.parse(value);

        if (!this.isPayloadValid(payload)) {
            throw new Error("Invalid QR payload.");
        }

        return payload.user;
    }

    private static isPayloadValid(payload: GymPassPayload): payload is GymPassPayload {
        if (!payload) {
            return false;
        }

        if (!payload.user) {
            return false;
        }

        const user = payload.user;

        return !(
            !("name" in user) ||
            !("id" in user) ||
            !("role" in user) ||
            !("login" in user) ||
            !("areReservationsForbidden" in user) ||
            !("gymPassExpirationTime" in user)
        );
    }
}
