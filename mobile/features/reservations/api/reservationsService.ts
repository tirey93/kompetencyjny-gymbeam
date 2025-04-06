import { apiRequest } from "@/api";
import { AddReservationDTO, ReservationDTO } from "@/types";

export class ReservationsService {
    public static getAllReservations(): Promise<ReservationDTO[]> {
        return apiRequest("Reservation", { method: "GET" });
    }

    public static addReservation(dto: AddReservationDTO): Promise<void> {
        return apiRequest("Reservation", { method: "POST", body: dto });
    }

    public static removeReservation(id: string | number): Promise<void> {
        return apiRequest(`Reservation/${id}`, { method: "DELETE" });
    }
}
