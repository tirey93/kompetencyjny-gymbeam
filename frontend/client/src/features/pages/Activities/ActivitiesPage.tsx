import { Container } from "@mantine/core";

import { ActivityCalendar } from "../../../common/components/ActivityCalendar";
import { ActivityItemCardProps } from "../../../common/components/ActivityCalendar/components/ActivityItemCard/ActivityItemCard";

import classes from "./ActivitiesPage.module.scss";

export const ActivitiesPage = () => {
    return (
        <Container size="xl" className={classes.container}>
            <ActivityCalendar activities={MOCK_ITEMS} height={800} />
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
        startsAt: new Date("2024-04-10T12:15:00.000Z"),
        participants: 14,
        maxParticipants: 15,
        duration: 30,
        name: "Judo",
        leader: "Anna Kowalska",
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
        startsAt: new Date("2024-04-12T16:30:00.000Z"),
        participants: 2,
        maxParticipants: 25,
        duration: 45,
        name: "Pilates",
        leader: "Ola Sosna",
    },
    {
        startsAt: new Date("2024-04-13T08:30:00.000Z"),
        participants: 21,
        maxParticipants: 25,
        duration: 45,
        name: "Boks",
        leader: "Jan Kowalski",
    },
    {
        startsAt: new Date("2024-04-14T08:30:00.000Z"),
        participants: 14,
        maxParticipants: 25,
        duration: 45,
        name: "Pilates",
        leader: "Ola Sosna",
    },
    {
        startsAt: new Date("2024-04-13T16:30:00.000Z"),
        participants: 0,
        maxParticipants: 25,
        duration: 45,
        name: "Pilates",
        leader: "Ola Sosna",
    },
    {
        startsAt: new Date("2024-04-10T20:30:00.000Z"),
        participants: 25,
        maxParticipants: 25,
        duration: 55,
        name: "BJJ",
        leader: "Dawid Okoń",
    },
    {
        startsAt: new Date("2024-04-14T020:30:00.000Z"),
        participants: 23,
        maxParticipants: 25,
        duration: 55,
        name: "BJJ",
        leader: "Dawid Okoń",
    },
    {
        startsAt: new Date("2024-04-11T20:30:00.000Z"),
        participants: 21,
        maxParticipants: 25,
        duration: 55,
        name: "BJJ",
        leader: "Dawid Okoń",
    },
    {
        startsAt: new Date("2024-04-12T14:30:00.000Z"),
        participants: 15,
        maxParticipants: 25,
        duration: 30,
        name: "Joga",
        leader: "Anna Nowak",
    },
    {
        startsAt: new Date("2024-04-15T14:30:00.000Z"),
        participants: 4,
        maxParticipants: 25,
        duration: 30,
        name: "Joga",
        leader: "Anna Nowak",
    },
    {
        startsAt: new Date("2024-04-16T14:30:00.000Z"),
        participants: 2,
        maxParticipants: 25,
        duration: 60,
        name: "Joga",
        leader: "Anna Nowak",
    },
    {
        startsAt: new Date("2024-04-17T14:30:00.000Z"),
        participants: 0,
        maxParticipants: 25,
        duration: 60,
        name: "Joga",
        leader: "Anna Nowak",
    },
];
