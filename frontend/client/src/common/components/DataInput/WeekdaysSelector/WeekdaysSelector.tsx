import { Chip, Group, Input, InputWrapperProps } from "@mantine/core";

import { useTranslate } from "../../../i18n";

import classes from "./WeekdaysSelector.module.scss";

export const WeekdaysSelector = (props: Omit<InputWrapperProps, "className">) => {
    const translate = useTranslate();
    const WEEKDAY_KEYS = [
        "weekday.monday.short",
        "weekday.tuesday.short",
        "weekday.wednesday.short",
        "weekday.thursday.short",
        "weekday.friday.short",
        "weekday.saturday.short",
        "weekday.sunday.short",
    ] as const;

    return (
        <Input.Wrapper {...props} className={classes.container}>
            <Group className={classes.daysWrapper}>
                {WEEKDAY_KEYS.map((day) => (
                    <Chip key={day} variant="outline" color="success">
                        {translate(day)}
                    </Chip>
                ))}
            </Group>
        </Input.Wrapper>
    );
};
