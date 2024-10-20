import { create } from "zustand";

import { UserDetails } from "@/types/Auth";

type AuthStore = {
    currentUserDetails: UserDetails | null;
    setCurrentUserDetails: (currentUserDetails: UserDetails) => void;
    clearCurrentUserDetails: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    currentUserDetails: null,
    setCurrentUserDetails: (currentUserDetails) => set({ currentUserDetails }),
    clearCurrentUserDetails: () => set({ currentUserDetails: null }),
}));
