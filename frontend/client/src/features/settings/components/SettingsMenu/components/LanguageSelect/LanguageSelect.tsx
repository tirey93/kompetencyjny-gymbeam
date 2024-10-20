import { Select } from "@mantine/core";

import { useTranslate } from "@/lib/i18n";
import { getLanguage, setLanguage } from "@/lib/i18n/i18n";

export const LanguageSelect = () => {
    const t = useTranslate();

    return (
        <Select
            checkIconPosition="left"
            size="xs"
            data={[
                { label: t("settings.language.options.polish"), value: "PL" },
                { label: t("settings.language.options.english"), value: "EN" },
            ]}
            defaultValue={getLanguage()}
            onChange={(lang) => lang && setLanguage(lang)}
        />
    );
};
