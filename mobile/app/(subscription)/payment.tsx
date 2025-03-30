import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import {  Stack } from "expo-router";
import { H2, styled, View } from "tamagui";

export default function PaymentScren() {
    return (
        <ScreenContainer>
            <Styled.Container>
                <Styled.Header>Payment</Styled.Header>
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
