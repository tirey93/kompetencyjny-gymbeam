import { useQuery } from "@tanstack/react-query";

import { HttpErrorsMap, mapErrorToErrorMessage } from "@/api";
import { ActivitiesService } from "@/features/activities";
import { ActivitiesQueryKeyFactory } from "@/features/activities/utils/acivitiesQueryKeyFactory";

type UseActivityOptions = {
    id: number;
};

export const useActivity = ({ id }: UseActivityOptions) => {
    const { error, ...result } = useQuery({
        queryFn: () => ActivitiesService.getActivity(id),
        queryKey: ActivitiesQueryKeyFactory.createForActivity(id),
    });

    return { ...result, error: error ? mapErrorToErrorMessage(error, errorsMap) : null };
};

const errorsMap: HttpErrorsMap = {
    defaultError: "Failed to find activity.",
    statusCodesMap: {},
};
