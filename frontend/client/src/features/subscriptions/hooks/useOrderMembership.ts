import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AppRoute } from "@/app/router";
import { SubscriptionsService } from "@/features/subscriptions/api/subscriptionsService";

type UseOrderGymMembership = {
    orderMembership: () => void;
    isPending: boolean;
};

export const useOrderMembership = (): UseOrderGymMembership => {
    const navigate = useNavigate();

    const retrieveOrderInformation = useCallback(async () => {
        const { clientSecret } = await SubscriptionsService.startPaymentProcess();
        navigate(AppRoute.PAYMENT, {
            state: { clientSecret },
        });
    }, [navigate]);

    const { mutateAsync, isPending } = useMutation({ mutationFn: retrieveOrderInformation });

    const orderMembership = useCallback(async () => {
        await mutateAsync();
    }, [mutateAsync]);

    return { orderMembership, isPending };
};
