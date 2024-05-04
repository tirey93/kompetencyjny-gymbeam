import { useMemo } from "react";
import { DatesRangeValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

import { Activity } from "../../../../../activities/Activities";

export const useActivityModalForm = (activity?: Activity) => {
    const startHour = useMemo(
        () => (activity?.startHour ? dayjs(activity.startHour).format("HH:mm") : undefined),
        [activity?.startHour]
    );

    const dateRange: DatesRangeValue | undefined = useMemo(
        () => (activity?.startTime && activity.endTime ? [activity.startTime, activity.endTime] : undefined),
        [activity?.endTime, activity?.startTime]
    );

    const duration = useMemo(
        () =>
            activity?.duration
                ? `${Math.floor(activity.duration / 60)}`.padStart(2, "0") +
                  ":" +
                  `${activity.duration % 60}`.padStart(2, "0")
                : undefined,
        [activity?.duration]
    );

    return useForm({
        initialValues: {
            name: activity?.name,
            longDescription: activity?.longDescription,
            shortDescription: activity?.shortDescription,
            leaderId: activity?.leaderId.toString(),
            totalCapacity: activity?.totalCapacity,
            days: activity?.days,
            duration,
            startHour,
            dateRange,
        },

        validate: {
            name: (value) => !value?.length && "Name is required.",
            shortDescription: (value) => !value?.length && "ShortDescription is required.",
            totalCapacity: (value) => !value && "TotalCapacity is required.",
            days: (value) => !value?.length && "Days are required.",
            duration: (value) => !value?.length && "Duration is required.",
            startHour: (value) => !value?.length && "StartHour is required.",
            dateRange: (value) => (!value || !value[0] || !value[1]) && "DateRange is required.",
            leaderId: (value) => !value && "Leader is required",
        },
    });
};
