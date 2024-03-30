import { useMemo } from "react";
import { Avatar } from "@mantine/core";

import { UserDetails } from "../../../../../../common/auth/Auth";

type UserAvatarProps = {
    user: UserDetails;
};

export const UserAvatar = ({ user }: UserAvatarProps) => {
    const userInitials = useMemo(() => {
        const words = user.displayName.split(" ");
        const initials = words.map((word) => word.charAt(0));
        return initials.slice(0, 2).join("");
    }, [user]);

    const avatarColor = useMemo(() => {
        if (user.reservationDisabled) {
            return "error";
        }

        if (user.role === "Admin") {
            return "secondary";
        } else {
            return "accent";
        }
    }, [user]);

    return (
        <Avatar color={avatarColor} size="md" radius="md">
            {userInitials}
        </Avatar>
    );
};
