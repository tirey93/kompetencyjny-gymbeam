export class ReservationsQueryKeyFactory {
    public static createForAll() {
        return ["reservations"];
    }

    public static createForUser(userId: number) {
        return ["reservations", { userId }];
    }
}
