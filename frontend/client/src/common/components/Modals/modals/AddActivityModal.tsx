import { useMemo } from "react";
import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, DatesRangeValue, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";

import { Modal } from "../../../../common/components/Modals";
import { Activity } from "../../../activities/Activities";
import { useTranslate } from "../../../i18n";
import { DaysInput } from "../../DataInput";

type AddActivityModalProps = ContextModalProps<{
    activity?: Activity;
}>;

export const AddActivityModal = ({ innerProps: { activity } }: AddActivityModalProps) => {
    const form = useActivityModalForm(activity);
    const translate = useTranslate();

    const MOCK_LEADER_OPTIONS = [
        { value: "1", label: "AAAA" },
        { value: "2", label: "BBBB" },
        { value: "3", label: "CCCC" },
        { value: "4", label: "DDDD" },
        { value: "5", label: "EEEE" },
    ];

    return (
        <Modal.Wrapper>
            <Modal.Title>
                {activity
                    ? translate("modals.activities.add.header.edit")
                    : translate("modals.activities.add.header.add")}
            </Modal.Title>

            <Modal.Body>
                <Group align="flex-start">
                    <TextInput required {...form.getInputProps("name")} label={translate("activity.name")} flex={1} />
                    <NumberInput
                        required
                        {...form.getInputProps("totalCapacity")}
                        label={translate("activity.capacity")}
                        w={80}
                        min={1}
                        max={99}
                    />
                </Group>

                <Select
                    data={MOCK_LEADER_OPTIONS}
                    nothingFoundMessage="No results."
                    searchable
                    required
                    {...form.getInputProps("leaderId")}
                    label={translate("activity.leader")}
                />

                <Group align="flex-start">
                    <TimeInput
                        required
                        {...form.getInputProps("startHour")}
                        label={translate("activity.startTime")}
                        w={100}
                    />
                    <TimeInput
                        required
                        {...form.getInputProps("duration")}
                        label={translate("activity.duration")}
                        w={100}
                    />
                </Group>

                <DatePickerInput
                    required
                    {...form.getInputProps("dateRange")}
                    label={translate("activity.period")}
                    flex={1}
                    type="range"
                    minDate={new Date()}
                />

                <DaysInput required {...form.getInputProps("days")} label={translate("activity.days")} />
                <Textarea required {...form.getInputProps("shortDescription")} label={translate("activity.summary")} />
                <Textarea {...form.getInputProps("longDescription")} label={translate("activity.description")} />
            </Modal.Body>

            <Modal.Footer
                onSubmit={form.validate}
                submitButton={{
                    color: "success",
                    children: translate("modals.activities.add.buttons.save"),
                }}
            />
        </Modal.Wrapper>
    );
};

const useActivityModalForm = (activity?: Activity) => {
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
