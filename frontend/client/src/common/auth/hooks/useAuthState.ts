import { create } from "zustand";

import { UserDetails, UserRole } from "../Auth";

type AuthState = {
    currentUserDetails: UserDetails | null;
    setCurrentUserDetails: (currentUserDetails: UserDetails) => void;
    clearCurrentUserDetails: () => void;
    getCurrentUserRole: () => UserRole;
};

export const useAuthState = create<AuthState>((set, getState) => ({
    currentUserDetails: null,
    getCurrentUserRole: () => getState()?.currentUserDetails?.role ?? "Guest",
    setCurrentUserDetails: (currentUserDetails) =>
        set({ currentUserDetails: { ...currentUserDetails, role: "Admin" } }),
    clearCurrentUserDetails: () => set({ currentUserDetails: null }),
}));
