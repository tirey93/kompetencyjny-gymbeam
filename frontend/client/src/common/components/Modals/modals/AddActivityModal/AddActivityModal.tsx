import { useMemo } from "react";
import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, DatesRangeValue, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import cronParser, { CronFields } from "cron-parser";
import dayjs from "dayjs";

import { Modal } from "../../../../../common/components/Modals";
import { Activity } from "../../../../activities/Activities";
import { useTranslate } from "../../../../i18n";
import { useAllUsers } from "../../../../users";
import { DaysInput } from "../../../DataInput";

import classes from "./AddActivityModal.module.scss";

type AddActivityModalProps = ContextModalProps<{
    activity?: Activity;
}>;

const MIN_NUMBER_OF_SLOTS = 2;
const MAX_NUMBER_OF_SLOTS = 99;

export const AddActivityModal = ({ innerProps: { activity } }: AddActivityModalProps) => {
    const form = useActivityModalForm(activity);
    const translate = useTranslate();
    const { users } = useAllUsers();
    const leaderSelectOptions = (users ?? []).map((user) => ({
        value: user.id.toString(),
        label: `${user.displayName}`,
    }));

    const generateCronExpression = () => {
        const { startHour, days } = form.values;

        if (!startHour || !days) {
            return;
        }

        const [hh, mm] = startHour.split(":");
        const baseInterval = cronParser.parseExpression("* * * * *");
        const fields = JSON.parse(JSON.stringify(baseInterval.fields));

        fields.dayOfWeek = days.map((day) => parseInt(day));
        fields.hour = [parseInt(hh)];
        fields.minute = [parseInt(mm)];
        fields.second = [0];

        return cronParser.fieldsToExpression(fields as CronFields);
    };

    generateCronExpression();

    return (
        <Modal.Wrapper className={classes.container}>
            <Modal.Title>
                {activity
                    ? translate("modals.activities.add.header.edit")
                    : translate("modals.activities.add.header.add")}
            </Modal.Title>

            <Modal.Body>
                <Group className={classes.inputsRow}>
                    <TextInput
                        required
                        {...form.getInputProps("name")}
                        label={translate("activity.name")}
                        className={classes.flexInput}
                    />
                    <NumberInput
                        required
                        {...form.getInputProps("totalCapacity")}
                        label={translate("activity.capacity")}
                        className={classes.numberInput}
                        min={MIN_NUMBER_OF_SLOTS}
                        max={MAX_NUMBER_OF_SLOTS}
                    />
                </Group>

                <Select
                    searchable
                    data={leaderSelectOptions}
                    nothingFoundMessage="No results."
                    required
                    {...form.getInputProps("leaderId")}
                    label={translate("activity.leader")}
                />

                <Group className={classes.inputsRow}>
                    <TimeInput
                        required
                        {...form.getInputProps("startHour")}
                        label={translate("activity.startTime")}
                        className={classes.timeInput}
                    />
                    <TimeInput
                        required
                        {...form.getInputProps("duration")}
                        label={translate("activity.duration")}
                        className={classes.timeInput}
                    />
                </Group>

                <DatePickerInput
                    required
                    {...form.getInputProps("dateRange")}
                    label={translate("activity.period")}
                    type="range"
                    className={classes.flexInput}
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
