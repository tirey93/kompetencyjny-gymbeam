import { Chip, Group, Input, InputWrapperProps } from "@mantine/core";

import { Day } from "../../../activities/Activities";
import { DAYS_SHORT } from "../../../constants";
import { useTranslate } from "../../../i18n";

import classes from "./DaysInput.module.scss";

type DaysInputProps = Omit<InputWrapperProps, "className"> & {
    defaultValue?: Day[];
};

export const DaysInput = ({ defaultValue, ...props }: DaysInputProps) => {
    const translate = useTranslate();

    return (
        <Input.Wrapper {...props} className={classes.container}>
            <Group className={classes.daysWrapper}>
                <Chip.Group defaultValue={defaultValue} multiple>
                    {Object.entries(DAYS_SHORT).map(([value, key]) => (
                        <Chip key={value} variant="outline" color="success" value={value}>
                            {translate(key)}
                        </Chip>
                    ))}
                </Chip.Group>
            </Group>
        </Input.Wrapper>
    );
};
