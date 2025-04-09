import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { PaymentForm } from "@/features/subscriptions/components/PaymentForm";
import PaymentScreenWrapper from "@/features/subscriptions/components/PaymentScreenWrapper";

export default function PaymentScreen() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const clientSecret = searchParams.get("clientSecret");

    useEffect(() => {
        if (!clientSecret) {
            router.replace(Screens.GymPass);
        }
    }, [clientSecret, router]);

    if (!clientSecret) {
        return null;
    }
    return (
        <ScreenContainer>
            <Styled.Container>
                <PaymentScreenWrapper>
                    <PaymentForm clientSecret={clientSecret} description="After confirming your payment, you will receive gym membership for 30 days. If you already have one, it will be extended by 30 days. Refunds are issued after mail contact." title="Order gym membership"></PaymentForm>
                </PaymentScreenWrapper>
            </Styled.Container>
        </ScreenContainer>
    );
}

const Styled = {
    Container: styled(View, {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "$background",
        padding: "$6",
    }),
    Header: styled(H2, {
        fontWeight: 700,
        width: "100%",
        marginBottom: "$4",
    }),
};
