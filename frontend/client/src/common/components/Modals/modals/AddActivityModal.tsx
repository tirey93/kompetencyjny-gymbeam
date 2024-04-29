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

    return (
        <Modal.Wrapper>
            <Modal.Title>
                {activity
                    ? translate("modals.activities.add.header.edit")
                    : translate("modals.activities.add.header.add")}
            </Modal.Title>

            <Modal.Body>
                <Group>
                    <TextInput {...form.getInputProps("name")} label={translate("activity.name")} flex={1} />
                    <NumberInput
                        {...form.getInputProps("totalCapacity")}
                        label={translate("activity.capacity")}
                        w={80}
                        min={1}
                        max={99}
                        placeholder="20"
                    />
                </Group>
                <Select label={translate("activity.leader")} />

                <Group>
                    <TimeInput {...form.getInputProps("startHour")} label={translate("activity.startTime")} w={100} />
                    <TimeInput {...form.getInputProps("duration")} label={translate("activity.duration")} w={100} />
                </Group>

                <DatePickerInput
                    {...form.getInputProps("dateRange")}
                    label={translate("activity.period")}
                    flex={1}
                    type="range"
                    minDate={new Date()}
                />

                <DaysInput {...form.getInputProps("days")} label={translate("activity.days")} />
                <Textarea {...form.getInputProps("shortDescription")} label={translate("activity.summary")} />
                <Textarea {...form.getInputProps("longDescription")} label={translate("activity.description")} />
            </Modal.Body>

            <Modal.Footer
                onSubmit={() => true}
                submitButton={{
                    color: "success",
                    children: translate("modals.activities.add.buttons.save"),
                }}
            />
        </Modal.Wrapper>
    );
};

const useActivityModalForm = (activity?: Activity) => {
    const startHour = activity?.startHour ? dayjs(activity.startHour).format("HH:mm") : undefined;

    const duration = activity?.duration
        ? `${Math.floor(activity.duration / 60)}`.padStart(2, "0") + ":" + `${activity.duration % 60}`.padStart(2, "0")
        : undefined;

    const dateRange: DatesRangeValue | undefined =
        activity?.startTime && activity.endTime ? [activity.startTime, activity.endTime] : undefined;

    return useForm({
        initialValues: {
            name: activity?.name,
            longDescription: activity?.longDescription,
            shortDescription: activity?.shortDescription,
            totalCapacity: activity?.totalCapacity,
            days: activity?.days,
            duration,
            startHour,
            dateRange,
        },
    });
};
