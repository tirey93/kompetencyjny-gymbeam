import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";

import { useActivityModalForm } from "./hooks/useActivityModalForm";
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
        // TODO: Hubert - use admins only
        value: user.id.toString(),
        label: `${user.displayName}`,
    }));

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
