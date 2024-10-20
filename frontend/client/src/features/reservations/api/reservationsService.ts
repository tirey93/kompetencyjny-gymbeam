import { request } from "@/api";
import { AddReservationDTO, ReservationDTO } from "@/types";

export class ReservationsService {
    public static getAllReservations(): Promise<ReservationDTO[]> {
        return request("Reservation", { method: "GET" });
    }

    public static addReservation(dto: AddReservationDTO): Promise<void> {
        return request("Reservation", { method: "POST", body: dto });
    }

    public static removeReservation(id: string | number): Promise<void> {
        return request(`Reservation/${id}`, { method: "DELETE" });
    }
}
