import { SegmentedControl } from "@mantine/core";

import { getLanguage, setLanguage } from "../../../../../common/i18n/i18n";

type LanguageSelectProps = {
    className?: string;
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
    return (
        <SegmentedControl
            size="xs"
            color="primary"
            className={className}
            defaultValue={getLanguage()}
            onChange={(lang) => setLanguage(lang)}
            data={["PL", "EN"]}
        />
    );
};
