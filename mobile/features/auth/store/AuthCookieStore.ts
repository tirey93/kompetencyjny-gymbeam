import * as SecureStore from "expo-secure-store";

export class AuthCookieStore {
    private static readonly key = "AUTH_COOKIE_KEY";

    public static async set(value: string) {
        await SecureStore.setItemAsync(AuthCookieStore.key, value);
    }

    public static async clear() {
        await SecureStore.deleteItemAsync(AuthCookieStore.key);
    }

    public static async get() {
        return await SecureStore.getItemAsync(AuthCookieStore.key);
    }
}
