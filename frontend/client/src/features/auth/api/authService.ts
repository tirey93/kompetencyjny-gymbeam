import { request } from "@/api";
import { SignInRequestBody, SignUpRequestBody } from "@/features/auth";
import { UserDetails } from "@/types";

export class AuthService {
    public static signIn(body: SignInRequestBody): Promise<UserDetails> {
        return request<UserDetails>("Authentication/Login", { method: "POST", body });
    }

    public static signUp(body: SignUpRequestBody): Promise<UserDetails> {
        return request<UserDetails>("Authentication/Register", { method: "POST", body });
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
}
