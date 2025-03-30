import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Screens } from "@/constants/Screens";
import { MembershipService } from "../api/membershipService";

type UseOrderGymMembership = {
    orderMembership: () => void;
    isPending: boolean;
};

export const useOrderMembership = (): UseOrderGymMembership => {
    const router = useRouter();

    const retrieveOrderInformation = useCallback(async () => {
        const { clientSecret } = await MembershipService.order();
        router.push({
            pathname: Screens.Payment,
            params: { clientSecret: clientSecret },
        });
    }, [router]);

    const { mutateAsync, isPending } = useMutation({ mutationFn: retrieveOrderInformation });

    const orderMembership = useCallback(async () => {
        await mutateAsync();
    }, [mutateAsync]);

    return { orderMembership, isPending };
};
