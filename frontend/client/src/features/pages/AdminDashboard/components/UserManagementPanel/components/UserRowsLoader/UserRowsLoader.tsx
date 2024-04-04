import { noop } from "@mantine/core";

import { MOCK_USERS } from "../../constants/fixtures";
import { UserRow } from "../UserRow/UserRow";

export const UserRowsLoader = () => {
    return MOCK_USERS.map((user, index) => (
        <UserRow
            key={index}
            userDetails={user}
            events={{
                onDelete: () => noop,
                onUserRoleChange: () => noop,
                onUserReservationsPermissionToggle: () => noop,
            }}
        />
    ));
};
