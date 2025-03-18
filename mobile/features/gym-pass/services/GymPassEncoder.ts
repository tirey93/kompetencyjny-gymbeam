import { User } from "@/types";

export class GymPassEncoder {
    public static encode(user: User): string {
        return JSON.stringify(user);
    }

    public static decode(value: string): User {
        const payload = JSON.parse(value);

        if (!this.isPayloadValid(payload)) {
            throw new Error("Invalid QR payload.");
        }

        return payload;
    }

    private static isPayloadValid(payload: User): payload is User {
        if (!payload) {
            return false;
        }

        return !(
            !("name" in payload) ||
            !("id" in payload) ||
            !("role" in payload) ||
            !("login" in payload) ||
            !("areReservationsForbidden" in payload) ||
            !("gymPassExpirationTime" in payload)
        );
    }
}
