import { apiRequest } from "@/api";
import { ChangePasswordBody } from "@/features/user";
import { UserDto } from "@/types/Auth";

export class UserService {
    public static changePassword(userId: number, body: ChangePasswordBody): Promise<UserDto> {
        const endpoint = `/User/${userId}/Password`;

        return apiRequest<UserDto>(endpoint, { method: "PUT", body });
    }

    public static getMyself(): Promise<UserDto> {
        return apiRequest("User/LoggedIn", { method: "GET" });
    }
}
