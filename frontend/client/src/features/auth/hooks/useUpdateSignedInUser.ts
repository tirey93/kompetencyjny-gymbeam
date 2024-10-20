import { useEffect } from "react";

import { useAuthState } from "./useAuthState";

import { request } from "@/api";
import { useAppOverlayStore } from "@/components/AppOverlay";

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
                try {
                    const data = await getUserDetailsRequest();

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
