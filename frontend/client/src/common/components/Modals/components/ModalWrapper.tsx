import { PropsWithChildren } from "react";
import { Stack } from "@mantine/core";

import classes from "./Modal.module.scss";

export const ModalWrapper = ({ children }: PropsWithChildren) => {
    return <Stack className={classes.wrapper}>{children}</Stack>;
};
