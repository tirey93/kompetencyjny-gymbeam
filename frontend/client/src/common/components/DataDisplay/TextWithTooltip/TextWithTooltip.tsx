import { PropsWithChildren, RefObject } from "react";
import { useOverflowDetector } from "react-detectable-overflow";
import { Text, TextProps, Tooltip } from "@mantine/core";

import classes from "./TextWithTooltip.module.scss";

type TextWithTooltipProps = PropsWithChildren<TextProps> & {
    label?: string | number;
};

export const TextWithTooltip = ({ children, label, ...rest }: TextWithTooltipProps) => {
    const { ref: overflowRef, overflow } = useOverflowDetector();

    return (
        <Tooltip
            className={classes.textWithOverflowTooltip}
            label={label ?? children}
            disabled={!overflow}
            withArrow
            position="top"
            color="primary"
            transitionProps={{ transition: "pop" }}
        >
            <Text ref={overflowRef as RefObject<HTMLParagraphElement>} truncate="end" {...rest}>
                {children}
            </Text>
        </Tooltip>
    );
};
