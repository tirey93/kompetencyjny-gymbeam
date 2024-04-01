import { create } from "zustand";

import { InternalUserRole, UserDetails } from "../Auth";

type AuthState = {
    currentUserDetails: UserDetails | null;
    setCurrentUserDetails: (currentUserDetails: UserDetails) => void;
    clearCurrentUserDetails: () => void;
    getCurrentUserRole: () => InternalUserRole;
};

export const useAuthState = create<AuthState>((set, getState) => ({
    currentUserDetails: null,
    getCurrentUserRole: () => getState()?.currentUserDetails?.role ?? "Guest",
    setCurrentUserDetails: (currentUserDetails) => set({ currentUserDetails }),
    clearCurrentUserDetails: () => set({ currentUserDetails: null }),
}));
