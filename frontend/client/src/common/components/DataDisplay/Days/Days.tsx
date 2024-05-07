import { Badge, Group } from "@mantine/core";

import { Day } from "../../../activities";
import { DAYS } from "../../../constants";
import { useTranslate } from "../../../i18n";

import classes from "./Days.module.scss";

type DaysProps = {
    value: Day[];
};

export const Days = ({ value }: DaysProps) => {
    const translate = useTranslate();

    return (
        <Group className={classes.container}>
            {value.map((day) => (
                <Badge variant="outline" key={day} color="secondary">
                    {parseInt(day) + 1} - {translate(DAYS[day].long)}
                </Badge>
            ))}
        </Group>
    );
};
