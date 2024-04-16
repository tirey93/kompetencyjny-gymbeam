import { useMemo } from "react";
import { noop } from "@mantine/core";

import { LoaderOverlay } from "../../../../../../../common/components/DataDisplay";
import { MOCK_USERS } from "../../constants/fixtures";
import { UserRow } from "../UserRow/UserRow";

export const UserRowsLoader = () => {
    const preparedMockData = useMemo(() => {
        return Array(5).fill(MOCK_USERS).flat();
    }, []);

    return (
        <>
            {preparedMockData.map((user, index) => (
                <UserRow
                    key={index}
                    userDetails={user}
                    events={{
                        onDelete: () => noop,
                        onUserRoleChange: () => noop,
                        onUserReservationsPermissionToggle: () => noop,
                    }}
                />
            ))}
            <LoaderOverlay visible />
        </>
    );
};
