import { useMemo } from "react";

import { StyledActivitiesList } from "@/features/activities/components/ActivitiesList/styled";
import { ActivityItem } from "@/features/activities/components/ActivityItem/ActivityItem";

type ActivitiesListProps = {
    activities: string[];
};

export const ActivitiesList = ({ activities }: ActivitiesListProps) => {
    const sortedActivities = useMemo(() => activities.sort((a, b) => (a > b ? 1 : -1)), [activities]);

    return (
        <StyledActivitiesList.Container>
            {sortedActivities.map((activity) => (
                <ActivityItem key={activity} name={activity} />
            ))}
        </StyledActivitiesList.Container>
    );
};
