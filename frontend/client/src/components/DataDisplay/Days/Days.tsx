import { Badge, Group } from "@mantine/core";

import classes from "./Days.module.scss";

import { WEEKDAYS } from "@/constants";
import { useTranslate } from "@/lib/i18n";
import { Day } from "@/types";

type DaysProps = {
    value: Day[];
};

export const Days = ({ value }: DaysProps) => {
    const translate = useTranslate();

    return (
        <Group className={classes.container}>
            {value.map((day) => (
                <Badge variant="outline" key={day} color="secondary">
                    {parseInt(day) + 1} - {translate(WEEKDAYS[day].long)}
                </Badge>
            ))}
        </Group>
    );
};
