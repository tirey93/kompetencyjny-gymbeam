import { Container, Stack } from "@mantine/core";

import { ActivityCard } from "./components/ActivityCard/ActivityCard";
import { ActivityCalendar } from "../../../common/components/ActivityCalendar";
import { ActivityItemCardProps } from "../../../common/components/ActivityCalendar/components/ActivityItemCard/ActivityItemCard";

import classes from "../Activities/ActivitiesPage.module.scss";

export const ActivityPage = () => {
    return (
        <Container className={classes.container}>
            <Stack>
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
                <ActivityCalendar activities={MOCK_ITEMS} />
            </Stack>
        </Container>
    );
};

const MOCK_ITEMS: ActivityItemCardProps[] = [
    {
        startsAt: new Date("2024-04-10T12:30:00.000Z"),
        participants: 25,
        maxParticipants: 25,
        duration: 55,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-10T08:30:00.000Z"),
        participants: 23,
        maxParticipants: 25,
        duration: 50,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-11T12:30:00.000Z"),
        participants: 21,
        maxParticipants: 25,
        duration: 55,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-11T17:30:00.000Z"),
        participants: 15,
        maxParticipants: 25,
        duration: 50,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-13T12:30:00.000Z"),
        participants: 4,
        maxParticipants: 25,
        duration: 45,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-12T08:30:00.000Z"),
        participants: 21,
        maxParticipants: 25,
        duration: 45,
        name: "Boks",
        leader: "Jan Kowalski",
    },
];
