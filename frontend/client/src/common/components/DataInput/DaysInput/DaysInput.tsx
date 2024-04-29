import { Chip, Group, Input, InputWrapperProps } from "@mantine/core";

import { Day } from "../../../activities/Activities";
import { DAYS_SHORT } from "../../../constants";
import { useTranslate } from "../../../i18n";

import classes from "./DaysInput.module.scss";

type DaysInputProps = Omit<InputWrapperProps, "className"> & {
    value?: Day[];
    onChange: (value: string[]) => unknown;
};

export const DaysInput = ({ value, onChange, ...inputWrapperProps }: DaysInputProps) => {
    const translate = useTranslate();

    return (
        <Input.Wrapper className={classes.container} {...inputWrapperProps}>
            <Group className={classes.daysWrapper}>
                <Chip.Group value={value} onChange={onChange} multiple>
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
