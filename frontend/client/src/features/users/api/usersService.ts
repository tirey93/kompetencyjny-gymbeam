import { request } from "@/api";
import { UserRole } from "@/types";
import { UserDto } from "@/types/Auth";

export class UsersService {
    public static getAllUsers(): Promise<UserDto[]> {
        return request("User", { method: "GET" });
    }

    public static getMyself(): Promise<UserDto> {
        return request("User/LoggedIn", { method: "GET" });
    }

    public static deleteUser(id: string | number): Promise<void> {
        return request(`User/${id}`, { method: "DELETE" });
    }

    public static changeUserRole({ id, role }: { id: string | number; role: UserRole }): Promise<void> {
        return request(`User/${id}/Role`, { method: "PUT", body: { newRole: role } });
    }

    public static changeUserReservationsPermission({
        id,
        permission,
    }: {
        id: string | number;
        permission: boolean;
    }): Promise<void> {
        return request(`User/${id}/ReservationDisabled`, { method: "PUT", queryParams: { value: permission } });
    }
}
