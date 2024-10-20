import { useEffect } from "react";

import { useAuthState } from "./useAuthState";

import { useAppOverlayStore } from "@/components/AppOverlay";
import { UsersService } from "@/features/users/api/usersService";

export const useUpdateSignedInUser = () => {
    const { setUser, user } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    useEffect(() => {
        (async () => {
            if (!user) {
                setIsLoading(true);
                try {
                    const data = await UsersService.getMyself();

                    if (data) {
                        setUser(data);
                    }
                } catch (error) {
                    /* No need to handle this error */
                } finally {
                    setIsLoading(false);
                }
            }
        })();
    }, [setIsLoading, setUser, user]);
};
