import { PropsWithChildren, RefObject } from "react";
import { useOverflowDetector } from "react-detectable-overflow";
import { Text, TextProps, Tooltip } from "@mantine/core";

import classes from "./TextWithTooltip.module.scss";

type TextWithTooltipProps = PropsWithChildren<TextProps> & {
    label?: string | number;
    alwaysEnabled?: boolean;
};

export const TextWithTooltip = ({ children, label, alwaysEnabled, ...rest }: TextWithTooltipProps) => {
    const { ref: overflowRef, overflow } = useOverflowDetector();

    return (
        <Tooltip
            classNames={{
                tooltip: classes.textWithOverflowTooltip,
            }}
            disabled={!alwaysEnabled && !overflow}
            label={label ?? children}
            withArrow
            position="top"
            color="info"
            transitionProps={{ transition: "pop" }}
        >
            <Text
                ref={overflowRef as RefObject<HTMLParagraphElement>}
                truncate="end"
                className={classes.text}
                {...rest}
            >
                {children}
            </Text>
        </Tooltip>
    );
};
