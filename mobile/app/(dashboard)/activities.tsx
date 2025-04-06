import { Tabs } from "expo-router";
import { SizableText, styled, View } from "tamagui";

import { ScreenContainer } from "@/components/ScreenContainer/ScreenContainer";
import { ActivitiesList } from "@/features/activities/components/ActivitiesList/ActivitiesList";
import { useActivities } from "@/features/activities/hooks/useActivities";

// TODO: Loading & error state
export default function Screen() {
    const { data, isPending } = useActivities();

    return (
        <Styled.OuterContainer>
            <Tabs.Screen options={{ title: "Activities", headerShown: false }} />
            <Styled.Header>All activities</Styled.Header>

            <Styled.InnerContainer>
                <ScreenContainer>
                    <Styled.ContentWrapper>{data && <ActivitiesList activities={data} />}</Styled.ContentWrapper>
                </ScreenContainer>
            </Styled.InnerContainer>
        </Styled.OuterContainer>
    );
}

const Styled = {
    OuterContainer: styled(View, {
        flex: 1,
        backgroundColor: "$background",
    }),
    InnerContainer: styled(View, {
        flex: 1,
    }),
    Header: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "bold",
        paddingTop: "$6",
        paddingBottom: "$2",
        paddingHorizontal: "$4",
        color: "$secondary11",
        textTransform: "uppercase",
    }),
    ContentWrapper: styled(View, {
        paddingBottom: "$2",
    }),
};
