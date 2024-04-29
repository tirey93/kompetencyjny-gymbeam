import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, DatesRangeValue, TimeInput } from "@mantine/dates";
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
    const translate = useTranslate();

    const startHour = activity?.startHour ? dayjs(activity.startHour).format("HH:mm") : undefined;
    const duration = activity?.duration
        ? `${Math.floor(activity.duration / 60)}`.padStart(2, "0") + ":" + `${activity.duration % 60}`.padStart(2, "0")
        : undefined;
    const dateRange: DatesRangeValue | undefined =
        activity?.startTime && activity.endTime ? [activity.startTime, activity.endTime] : undefined;

    return (
        <Modal.Wrapper>
            <Modal.Title>
                {activity
                    ? translate("modals.activities.add.header.edit")
                    : translate("modals.activities.add.header.add")}
            </Modal.Title>

            <Modal.Body>
                <Group>
                    <TextInput defaultValue={activity?.name} label={translate("activity.name")} flex={1} />
                    <NumberInput
                        defaultValue={activity?.totalCapacity}
                        label={translate("activity.capacity")}
                        w={80}
                        min={1}
                        max={99}
                        placeholder="20"
                    />
                </Group>
                <Select label={translate("activity.leader")} />

                <Group>
                    <TimeInput defaultValue={startHour} label={translate("activity.startTime")} w={100} />
                    <TimeInput defaultValue={duration} label={translate("activity.duration")} w={100} />
                </Group>

                <DatePickerInput
                    defaultValue={dateRange}
                    label={translate("activity.period")}
                    flex={1}
                    type="range"
                    minDate={new Date()}
                />

                <DaysInput defaultValue={activity?.days} label={translate("activity.days")} />
                <Textarea defaultValue={activity?.shortDescription} label={translate("activity.summary")} />
                <Textarea defaultValue={activity?.longDescription} label={translate("activity.description")} />
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
