import { Stack } from "@mantine/core";

import { ActivityCard } from "./components/ActivityCard/ActivityCard";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    return (
        <Stack className={classes.container}>
            <ActivityCard
                activity={{
                    name: "Boks",
                    leaderName: "Jan Kowalski",
                    leaderId: 1,
                    duration: 3600,
                    startTime: new Date(),
                    endTime: new Date(),
                    totalCapacity: 20,
                    longDescription:
                        "Boks zyskuje coraz bardziej na popularności jako dziedzina ogólnorozwojowa – oprócz wiedzy na temat przyjmowania i wyprowadzania ciosów zdobędziesz nową, wyrzeźbioną sylwetkę i większą pewność siebie.",
                    shortDescription: "Lorem",
                    cron: "* * * * *",
                    id: 1,
                }}
            />
        </Stack>
    );
};
