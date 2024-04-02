import { useEffect } from "react";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { request } from "../../request";
import { useAuthState } from "./useAuthState";

const getUserDetailsRequest = () => {
    return request("CurrentUserDetails");
};

export const useUpdateSignedInUser = () => {
    const { setUser, user } = useAuthState();
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    useEffect(() => {
        (async () => {
            if (!user) {
                setIsLoading(true);
                const { data } = await getUserDetailsRequest();

                if (data) {
                    setUser(data);
                }

                setIsLoading(false);
            }
        })();
    }, [setIsLoading, setUser, user]);
};
