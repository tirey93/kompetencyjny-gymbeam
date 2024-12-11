import { useMemo } from "react";
import { Avatar } from "@mantine/core";

import classes from "./UserAvatar.module.scss";

import { User } from "@/types";

type UserAvatarProps = {
    user: User;
};

export const UserAvatar = ({ user }: UserAvatarProps) => {
    const userInitials = useMemo(() => {
        const words = user.name.split(" ");
        const initials = words.map((word) => word.charAt(0));
        return initials.slice(0, 2).join("");
    }, [user]);

    const avatarColor = useMemo(() => {
        if (user.areReservationsForbidden) {
            return "danger";
        }

        if (user.role === "Admin") {
            return "secondary";
        } else {
            return "primary";
        }
    }, [user]);

    return (
        <Avatar color={avatarColor} className={classes.userAvatar}>
            {userInitials}
        </Avatar>
    );
};
