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
    cron: string;
};

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
};
