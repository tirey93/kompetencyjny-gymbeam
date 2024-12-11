import { request } from "@/api";
import { SignInRequestBody, SignUpRequestBody } from "@/features/auth";
import { OIDCInitializedResult, UserDto } from "@/types/Auth";

export class AuthService {
    public static signIn(body: SignInRequestBody): Promise<UserDto> {
        return request<UserDto>("Authentication/Login", { method: "POST", body });
    }

    public static signUp(body: SignUpRequestBody): Promise<UserDto> {
        return request<UserDto>("Authentication/Register", { method: "POST", body });
    }

    public static signOut(): Promise<null> {
        return request("Authentication/Logout", { method: "POST" });
    }

    public static checkUsernameAvailability(username: string): Promise<boolean> {
        return request<boolean>(`User/CheckAvailability/ByName/${username}`, {
            method: "GET",
            urlParams: { username },
        });
    }

    public static signInWithGoogle(): Promise<OIDCInitializedResult> {
        return request<OIDCInitializedResult>("Authentication/google", { method: "GET" });
    }
}
