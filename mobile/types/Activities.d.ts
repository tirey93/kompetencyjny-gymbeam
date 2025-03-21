import { Day } from "@/types/Common";

export type Activity = {
    id: number;
    totalCapacity: number;
    duration: number;
    leaderId: number;
    startTime: Date;
    endTime: Date;
    name: string;
    shortDescription: string;
    longDescription: string;
    leaderName: string;
    days: Day[];
    startHour: Date;
};

export type ActivityDTO = {
    id: number;
    totalCapacity: number;
    duration: number;
    leaderId: number;
    startTime: string;
    endTime: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    leaderName: string;
    cron: string;
};

export type AddActivityDTO = Omit<ActivityDTO, "id" | "leaderName">;

export type ActivityInstance = {
    activityId: number;
    leaderId: number;
    slotsTaken: number;
    totalCapacity: number;
    startTime: Date;
    duration: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    leaderName: string;
    reservationId: number | null;
};
