import { apiRequest } from "@/api";
import { SignInRequestBody, SignUpRequestBody } from "@/features/auth";
import { OIDCInitializedResult, UserDto } from "@/types/Auth";

export class AuthService {
    public static signIn(body: SignInRequestBody): Promise<UserDto> {
        return apiRequest<UserDto>("Authentication/Login", { method: "POST", body });
    }

    public static signUp(body: SignUpRequestBody): Promise<UserDto> {
        return apiRequest<UserDto>("Authentication/Register", { method: "POST", body });
    }

    public static signOut(): Promise<null> {
        return apiRequest("Authentication/Logout", { method: "POST" });
    }

    public static signInWithGoogle(): Promise<OIDCInitializedResult> {
        return apiRequest<OIDCInitializedResult>("Authentication/google", { method: "GET" });
    }
}
