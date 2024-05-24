export type AddReservationDTO = {
    activityId: number;
    userId: number;
    startTime: string;
};

export type Reservation = {
    id: number;
    activityId: number;
    userId: number;
    duration: number;
    startTime: Date;
    leaderName: string;
    activityName: string;
    userDisplayName: string;
};

export type ReservationDTO = Omit<Reservation, "startTime"> & { startTime: string };
