import { create } from "zustand";

import { User } from "@/types/Auth";

type AuthStore = {
    currentUserDetails: User | null;
    setCurrentUserDetails: (currentUserDetails: User) => void;
    clearCurrentUserDetails: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    currentUserDetails: null,
    setCurrentUserDetails: (currentUserDetails) => set({ currentUserDetails }),
    clearCurrentUserDetails: () => set({ currentUserDetails: null }),
}));
