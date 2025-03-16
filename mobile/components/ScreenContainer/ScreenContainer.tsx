import { PropsWithChildren } from "react";

import { Scrollable } from "@/components/Scrollable/Scrollable";

export const ScreenContainer = ({ children }: PropsWithChildren) => {
    return <Scrollable>{children}</Scrollable>;
};
