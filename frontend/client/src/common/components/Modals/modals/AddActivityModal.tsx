import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";

import { Modal } from "../../../../common/components/Modals";
import { Activity } from "../../../activities/Activities";
import { useTranslate } from "../../../i18n";
import { WeekdaysSelector } from "../../DataInput";

type AddActivityModalProps = ContextModalProps<{
    activity?: Activity;
}>;

export const AddActivityModal = ({ innerProps: { activity } }: AddActivityModalProps) => {
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
                    <TextInput label={translate("activity.name")} flex={1} />
                    <NumberInput label={translate("activity.capacity")} w={80} min={1} max={99} placeholder="20" />
                </Group>
                <Select label={translate("activity.leader")} />

                <Group>
                    <TimeInput label={translate("activity.startTime")} w={100} />
                    <TimeInput label={translate("activity.duration")} w={100} />
                    <DatePickerInput label={translate("activity.period")} flex={1} type="range" minDate={new Date()} />
                </Group>

                <WeekdaysSelector label={translate("activity.weekdays")} />
                <Textarea label={translate("activity.summary")} />
                <Textarea label={translate("activity.description")} />
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
