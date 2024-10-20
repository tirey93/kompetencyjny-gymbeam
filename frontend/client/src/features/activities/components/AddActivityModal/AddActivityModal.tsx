import { useCallback } from "react";
import { Group, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import classes from "./AddActivityModal.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { DaysInput } from "@/components/DataInput";
import { Modal } from "@/components/Modals";
import { generateCronExpression, useAddActivity, useUpdateActivity } from "@/features/activities";
import { useActivityModalForm } from "@/features/activities/components/AddActivityModal/hooks/useActivityModalForm";
import { useAllUsers } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { Activity, ActivityDTO, AddActivityDTO } from "@/types/Activities";

type AddActivityModalProps = ContextModalProps<{
    activity?: Activity;
}>;

const MIN_NUMBER_OF_SLOTS = 2;
const MAX_NUMBER_OF_SLOTS = 99;
const NAME_MAX_LENGTH = 255;
const LONG_DESCRIPTION_MAX_LENGTH = 4000;
const SHORT_DESCRIPTION_MAX_LENGTH = 1000;

export const AddActivityModal = ({ innerProps: { activity }, id }: AddActivityModalProps) => {
    const form = useActivityModalForm(activity);
    const translate = useTranslate();
    const { users } = useAllUsers();
    const { addActivity, isLoading: isAdding, error: addError, reset: resetAdd } = useAddActivity();
    const { updateActivity, isLoading: isUpdating, error: updateError, reset: resetUpdate } = useUpdateActivity();

    const leaderSelectOptions = (users ?? [])
        .filter((user) => user.role === "Admin")
        .map((user) => ({
            value: user.id.toString(),
            label: `${user.displayName}`,
        }));

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

    const mapFormValuesToAddActivityDTO = useCallback(() => {
        const {
            name,
            days,
            duration,
            longDescription,
            shortDescription,
            leaderId,
            totalCapacity,
            startHour,
            dateRange,
        } = form.values;

        if (
            !name ||
            !days ||
            !duration ||
            !shortDescription ||
            !leaderId ||
            !totalCapacity ||
            !startHour ||
            !dateRange?.[0] ||
            !dateRange?.[1]
        ) {
            return null;
        }

        const [durationHours, durationMinutes] = duration.split(":");

        return {
            name: name!,
            totalCapacity: totalCapacity,
            leaderId: parseInt(leaderId),
            startTime: dateRange[0].toISOString(),
            endTime: dateRange[1].toISOString(),
            duration: parseInt(durationHours) * 60 + parseInt(durationMinutes),
            cron: generateCronExpression(startHour, days).stringify(),
            shortDescription: shortDescription,
            longDescription: longDescription?.length ? longDescription : shortDescription,
        };
    }, [form.values]);

    const handleUpdateActivity = useCallback(
        async (updatedActivityDTO: ActivityDTO) => {
            await updateActivity(updatedActivityDTO);
            notifications.show({
                withBorder: true,
                title: translate("notifications.activity.update.title"),
                message: translate("notifications.activity.update.description", { id: updatedActivityDTO.id }),
                color: "success",
            });
        },
        [translate, updateActivity]
    );

    const handleAddActivity = useCallback(
        async (addActivityDto: AddActivityDTO) => {
            await addActivity(addActivityDto);
            notifications.show({
                withBorder: true,
                title: translate("notifications.activity.add.title"),
                message: translate("notifications.activity.add.description", { name: addActivityDto.name }),
                color: "success",
            });
        },
        [addActivity, translate]
    );

    const onSubmit = useCallback(async () => {
        if (form.validate().hasErrors) {
            return;
        }

        const addActivityDto = mapFormValuesToAddActivityDTO();

        if (!addActivityDto) {
            return;
        }

        if (activity) {
            const updatedActivityDTO: ActivityDTO = {
                id: activity.id,
                leaderName: activity.leaderName,
                ...addActivityDto,
            };
            await handleUpdateActivity(updatedActivityDTO);
        } else {
            await handleAddActivity(addActivityDto);
        }

        onClose();
    }, [activity, form, handleAddActivity, handleUpdateActivity, mapFormValuesToAddActivityDTO, onClose]);

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
                        maxLength={NAME_MAX_LENGTH}
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

                <Textarea
                    required
                    maxLength={SHORT_DESCRIPTION_MAX_LENGTH}
                    {...form.getInputProps("shortDescription")}
                    label={translate("activity.summary")}
                />
                <Textarea
                    maxLength={LONG_DESCRIPTION_MAX_LENGTH}
                    {...form.getInputProps("longDescription")}
                    label={translate("activity.description")}
                />

                {addError && <ErrorMessage onClose={resetAdd}>{addError}</ErrorMessage>}
                {updateError && <ErrorMessage onClose={resetUpdate}>{updateError}</ErrorMessage>}
            </Modal.Body>

            <Modal.Footer
                isLoading={isAdding || isUpdating}
                submitButton={{
                    color: "success",
                    children: translate("modals.activities.add.buttons.confirm"),
                    onClick: onSubmit,
                }}
                cancelButton={{
                    children: translate("modals.activities.add.buttons.cancel"),
                    onClick: onClose,
                }}
            />
        </Modal.Wrapper>
    );
};
