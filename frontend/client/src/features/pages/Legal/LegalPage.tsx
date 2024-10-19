import { Stack } from "@mantine/core";

import { TermsAndConditionsList } from "./components/TermsAndConditionsList";

import classes from "./LegalPage.module.scss";

export const LegalPage = () => {
    return (
        <Stack className={classes.container}>
            <TermsAndConditionsList />
        </Stack>
    );
};
