import React, { useMemo, useState } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { CircleHelpIcon } from "lucide-react-native";
import { Sheet, SizableText, styled, View } from "tamagui";

import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { useActivitiesInstances } from "@/features/activities";
import { ActivityDetails } from "@/features/activities/components/ActivityDetails/ActivityDetails";
import { ActivitySchedule } from "@/features/activities/components/ActivitySchedule/ActivitySchedule";
import { useActivity } from "@/features/activities/hooks/useActivity";
import { getDateRange } from "@/utils/dateRangeUtils";

const FOUR_WEEKS = 28;
const ICON_COLOR = "white";

export default function Screen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const { data: activity, isLoading: isActivityLoading } = useActivity({ id: parseInt(id) });

    const {
        activitiesInstances,
        isLoading: areInstancesLoading,
        refetch,
    } = useActivitiesInstances({
        type: "ByDateRange",
        dateRange: getDateRange({ length: FOUR_WEEKS }),
    });

    // API doesn't allow to fetch instances of particular activity.
    const filteredActivityInstances = useMemo(
        () => activitiesInstances?.filter((activityInstance) => activityInstance.name === activity?.name),
        [activitiesInstances, activity?.name]
    );

    const showDetails = () => {
        setIsSheetOpen(true);
    };

    if (isActivityLoading || areInstancesLoading) {
        return (
            <Styled.NoContentContainer>
                <Spinner size="large" />
            </Styled.NoContentContainer>
        );
    }

    if (!activity || !filteredActivityInstances) {
        return (
            <Styled.NoContentContainer>
                <Styled.NoContentMessage>Failed to load activity.</Styled.NoContentMessage>
            </Styled.NoContentContainer>
        );
    }

    return (
        <Styled.OuterContainer>
            <Tabs.Screen options={{ title: activity.name, headerShown: false }} />
            <Styled.Header>
                <Styled.ActivityName>{activity.name}</Styled.ActivityName>
                <Styled.MoreButton onPress={showDetails}>
                    <CircleHelpIcon color={ICON_COLOR} />
                </Styled.MoreButton>
            </Styled.Header>

            <ActivitySchedule
                activities={filteredActivityInstances}
                isLoading={areInstancesLoading}
                onRefresh={refetch}
            />

            <Sheet modal dismissOnSnapToBottom open={isSheetOpen} onOpenChange={setIsSheetOpen} snapPoints={[100]}>
                <Sheet.Frame>
                    <Sheet.Handle />
                    <ActivityDetails
                        name={activity.name}
                        description={activity.longDescription ?? activity.shortDescription}
                    />
                </Sheet.Frame>
            </Sheet>
        </Styled.OuterContainer>
    );
}

const Styled = {
    NoContentContainer: styled(View, {
        flex: 1,
        backgroundColor: "$background",
        alignItems: "center",
        justifyContent: "center",
    }),
    NoContentMessage: styled(SizableText, {
        color: "$secondary11",
    }),
    OuterContainer: styled(View, {
        flex: 1,
        backgroundColor: "$background",
    }),
    InnerContainer: styled(View, {
        flex: 1,
    }),
    MoreButton: styled(Button, {
        rounded: "$12",
        fontWeight: "bold",
        theme: "secondary",
        width: 45,
        height: 45,
    }),
    Header: styled(View, {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "$2",
        paddingTop: "$6",
        paddingBottom: "$2",
        paddingHorizontal: "$4",
    }),
    ActivityName: styled(SizableText, {
        fontSize: "$8",
        fontWeight: "bold",
        color: "$secondary11",
        textTransform: "uppercase",
    }),
};
