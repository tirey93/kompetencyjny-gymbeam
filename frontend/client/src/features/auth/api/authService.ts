import { request } from "@/api";
import { UserDetails } from "@/types";

export type SignInRequestBody = { username: string; password: string };

export type SignUpRequestBody = { displayName: string; username: string; password: string };

export class AuthService {
    public static signIn(body: SignInRequestBody): Promise<UserDetails> {
        return request<UserDetails>("/Authentication/Login", { method: "POST", body });
    }

    public static signUp(body: SignUpRequestBody): Promise<UserDetails> {
        return request<UserDetails>("/Authentication/Register", { method: "POST", body });
    }

    public static signOut(): Promise<null> {
        return request("/Authentication/Logout", { method: "POST" });
    }

    public static checkUsernameAvailability(username: string): Promise<boolean> {
        return request<boolean>(`/User/CheckAvailability/ByName/${username}`, {
            method: "GET",
            urlParams: { username },
        });
    }
}
