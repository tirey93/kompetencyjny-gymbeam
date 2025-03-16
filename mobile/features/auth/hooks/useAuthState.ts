import { useMemo } from "react";

import { useAuthStore } from "../store/AuthStore";

import { InternalUserRole, User } from "@/types/Auth";

type UseAuthState = {
    setUser: (user: User) => void;
    clearUser: () => void;
    role: InternalUserRole;
    user: User | null;
    isSignedIn: boolean;
};

export const useAuthState = (): UseAuthState => {
    const user = useAuthStore((state) => state.currentUserDetails);
    const clearUser = useAuthStore((state) => state.clearCurrentUserDetails);
    const setUser = useAuthStore((state) => state.setCurrentUserDetails);

    const role = useMemo(() => user?.role ?? "Guest", [user?.role]);
    const isSignedIn = useMemo(() => role !== "Guest", [role]);

    return { setUser, clearUser, role, user, isSignedIn };
};
