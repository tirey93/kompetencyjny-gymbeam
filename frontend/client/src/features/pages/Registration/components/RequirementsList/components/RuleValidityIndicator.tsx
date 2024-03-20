import {ThemeIcon} from "@mantine/core";
import {useMemo} from "react";

type RuleValidityIndicatorProps = {
    state: boolean | null;
}

export const RuleValidityIndicator = ({ state }: RuleValidityIndicatorProps) => {
    const color = useMemo(() => {
        switch (state) {
            case false:
                return "error";
            case true:
                return "success";
            default:
                return "info";
        }
    }, [state])

    return <ThemeIcon size={10} color={color} radius={0} />
}
