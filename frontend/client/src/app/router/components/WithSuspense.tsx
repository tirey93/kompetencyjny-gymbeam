import { ReactNode, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";

import { Loader } from "@/components/Modals/components";

export const WithSuspense = (children: ReactNode) => (
    <Suspense
        fallback={
            <LoadingOverlay>
                <Loader />
            </LoadingOverlay>
        }
    >
        {children}
    </Suspense>
);
