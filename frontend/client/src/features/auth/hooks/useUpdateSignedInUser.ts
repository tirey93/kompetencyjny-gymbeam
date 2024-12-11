import { useCallback, useEffect } from "react";

import { useAuthState } from "./useAuthState";

import { useAppOverlayStore } from "@/components/AppOverlay";
import { UsersService } from "@/features/users";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";

type UseUpdateSignedInUserOptions = {
    force?: boolean;
};

export const useUpdateSignedInUser = ({ force }: UseUpdateSignedInUserOptions = {}) => {
    const { setUser, user } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    const loadDetailsOfMyself = useCallback(async () => {
        setIsLoading(true);

        try {
            const data = await UsersService.getMyself();

            if (data) {
                setUser(mapUserDtoToUser(data));
            }
        } catch (error) {
            /* No need to handle this error */
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setUser]);

    useEffect(() => {
        if (!user?.id || force) {
            void loadDetailsOfMyself();
        }
    }, [force, loadDetailsOfMyself, user?.id]);
};
