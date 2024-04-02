import { create } from "zustand";

import { UserDetails } from "../Auth";

type AuthState = {
    currentUserDetails: UserDetails | null;
    setCurrentUserDetails: (currentUserDetails: UserDetails) => void;
    clearCurrentUserDetails: () => void;
};

export const useAuthState = create<AuthState>((set) => ({
    currentUserDetails: null,
    setCurrentUserDetails: (currentUserDetails) => set({ currentUserDetails }),
    clearCurrentUserDetails: () => set({ currentUserDetails: null }),
}));
