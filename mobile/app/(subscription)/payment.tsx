import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { H2, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { Screens } from "@/constants/Screens";
import { PaymentForm } from "@/features/subscriptions/components/PaymentForm";
import { PaymentFormProvider } from "@/features/subscriptions/components/PaymentFormProvider";

export default function PaymentScren() {
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
                <Styled.Header>{searchParams.get("clientSecret")}</Styled.Header>
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
