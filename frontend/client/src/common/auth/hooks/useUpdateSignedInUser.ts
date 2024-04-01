import { useEffect } from "react";

import { useAppOverlayStore } from "../../components/AppOverlay";
import { request } from "../../request";
import { useAuthState } from "./useAuthState";

const getUserDetailsRequest = () => {
    return request("CurrentUserDetails");
};

export const useUpdateSignedInUser = () => {
    const userDetails = useAuthState((state) => state.currentUserDetails);
    const setUserDetails = useAuthState((state) => state.setCurrentUserDetails);
    const setIsLoading = useAppOverlayStore((state) => state.setIsLoading);

    useEffect(() => {
        (async () => {
            if (!userDetails) {
                setIsLoading(true);
                const { data } = await getUserDetailsRequest();

                if (data) {
                    setUserDetails(data);
                }

                setIsLoading(false);
            }
        })();
    }, [setIsLoading, setUserDetails, userDetails]);
};
