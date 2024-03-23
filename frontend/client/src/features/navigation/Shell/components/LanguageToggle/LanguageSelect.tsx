import { SegmentedControl } from "@mantine/core";

import { getLanguage, setLanguage } from "../../../../../common/i18n/i18n";

export const LanguageSelect = () => {
    return (
        <SegmentedControl
            color="primary"
            defaultValue={getLanguage()}
            onChange={(lang) => setLanguage(lang)}
            data={["PL", "EN"]}
        />
    );
};
