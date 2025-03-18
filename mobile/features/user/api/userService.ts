import { apiRequest } from "@/api";
import { ChangePasswordBody } from "@/features/user";
import { OIDCInitializedResult, UserDto } from "@/types/Auth";

export class UserService {
    public static changePassword(body: ChangePasswordBody): Promise<UserDto> {
        const userId = 1; // TODO: where can I find?
        const endpoint = `/User/${userId}/Password`;

        return apiRequest<UserDto>(endpoint, { method: "PUT", body });
    }
}
