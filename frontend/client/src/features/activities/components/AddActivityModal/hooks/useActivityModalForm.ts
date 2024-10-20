import { useMemo } from "react";
import { DatesRangeValue } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import dayjs from "dayjs";
import * as yup from "yup";

import { useTranslate } from "@/lib/i18n";
import { Activity } from "@/types";

export const useActivityModalForm = (activity?: Activity) => {
    const translate = useTranslate();

    const initialStartHour = useMemo(
        () => (activity?.startHour ? dayjs(activity.startHour).format("HH:mm") : undefined),
        [activity?.startHour]
    );

    const initialDateRange: DatesRangeValue | undefined = useMemo(
        () => [activity?.startTime ?? null, activity?.endTime ?? null],
        [activity?.endTime, activity?.startTime]
    );

    const initialDuration = useMemo(
        () =>
            activity?.duration
                ? `${Math.floor(activity.duration / 60)}`.padStart(2, "0") +
                  ":" +
                  `${activity.duration % 60}`.padStart(2, "0")
                : undefined,
        [activity?.duration]
    );

    const validationSchema = yup.object().shape({
        name: yup.string().required(translate("modals.activities.add.formValidation.name.required")),
        leaderId: yup.number().required(translate("modals.activities.add.formValidation.leaderId.required")),
        totalCapacity: yup.number().required(translate("modals.activities.add.formValidation.totalCapacity.required")),
        duration: yup.string().required(translate("modals.activities.add.formValidation.duration.required")),
        startHour: yup.string().required(translate("modals.activities.add.formValidation.startHour.required")),
        dateRange: yup.array().test({
            message: translate("modals.activities.add.formValidation.dateRange.required"),
            test: (dateRange) => dateRange?.every((date) => !!date),
        }),
        days: yup
            .array()
            .required(translate("modals.activities.add.formValidation.days.required"))
            .min(1, translate("modals.activities.add.formValidation.days.required")),
        shortDescription: yup
            .string()
            .required(translate("modals.activities.add.formValidation.shortDescription.required")),
    });

    return useForm({
        initialValues: {
            name: activity?.name,
            longDescription: activity?.longDescription,
            shortDescription: activity?.shortDescription,
            leaderId: activity?.leaderId.toString(),
            totalCapacity: activity?.totalCapacity,
            days: activity?.days,
            duration: initialDuration,
            startHour: initialStartHour,
            dateRange: initialDateRange,
        },
        validate: yupResolver(validationSchema),
    });
};
