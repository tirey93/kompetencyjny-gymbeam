import { useMemo } from "react";
import { ThemeIcon } from "@mantine/core";

type RuleValidityIndicatorProps = {
    state: boolean | null;
};

export const RuleValidityIndicator = ({ state }: RuleValidityIndicatorProps) => {
    const color = useMemo(() => {
        switch (state) {
            case false:
                return "error";
            case true:
                return "success";
            default:
                return "primary";
        }
    }, [state]);

    return <ThemeIcon size={10} color={color} radius={0} />;
};
