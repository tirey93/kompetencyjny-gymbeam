import { useMemo } from "react";

import { InternalUserRole, UserDetails } from "../Auth";
import { useAuthStore } from "../store/AuthStore";

type UseAuthState = {
    setUser: (user: UserDetails) => void;
    clearUser: () => void;
    role: InternalUserRole;
    user: UserDetails | null;
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
