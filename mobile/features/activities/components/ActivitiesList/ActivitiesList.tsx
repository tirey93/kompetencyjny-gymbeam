import { useMemo } from "react";

import { StyledActivitiesList } from "@/features/activities/components/ActivitiesList/styled";
import { ActivityItem } from "@/features/activities/components/ActivityItem/ActivityItem";
import { Activity } from "@/types";

type ActivitiesListProps = {
    activities: Activity[];
};

export const ActivitiesList = ({ activities }: ActivitiesListProps) => {
    const sortedActivities = useMemo(() => activities.sort((a, b) => (a.name > b.name ? 1 : -1)), [activities]);

    return (
        <StyledActivitiesList.Container>
            {sortedActivities.map(({ name, id }) => (
                <ActivityItem key={id} name={name} id={id} />
            ))}
        </StyledActivitiesList.Container>
    );
};
