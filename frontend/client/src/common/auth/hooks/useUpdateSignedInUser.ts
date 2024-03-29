import { useEffect } from "react";

import { request } from "../../request";
import { useAuthState } from "./useAuthState";

const getUserDetailsRequest = () => {
    return request("CurrentUserDetails");
};

export const useUpdateSignedInUser = () => {
    const userDetails = useAuthState((state) => state.currentUserDetails);
    const setUserDetails = useAuthState((state) => state.setCurrentUserDetails);

    useEffect(() => {
        (async () => {
            if (!userDetails) {
                const { data } = await getUserDetailsRequest();

                if (data) {
                    setUserDetails(data);
                }
            }
        })();
    }, []);
};
