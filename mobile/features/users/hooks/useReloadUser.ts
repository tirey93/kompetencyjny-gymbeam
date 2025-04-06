import { useCallback, useEffect } from "react";

import { useAuthState } from "@/features/auth";
import { UserService } from "@/features/users";
import { mapUserDtoToUser } from "@/features/users/utils/mapUserDtoToUser";
import { useAppOverlay } from "@/hooks/useAppOverlay";

type UseUpdateSignedInUserOptions = {
    force?: boolean;
};

// TODO: Doesn't work, we receive 400 on each request
export const useReloadUser = ({ force }: UseUpdateSignedInUserOptions = {}) => {
    const { setUser, user } = useAuthState();
    const setIsLoading = useAppOverlay((state) => state.setIsLoading);

    const loadDetailsOfMyself = useCallback(async () => {
        setIsLoading(true);

        try {
            const data = await UserService.getMyself();

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
