import { useMemo } from "react";
import { Avatar } from "@mantine/core";

import { UserDetails } from "../../../auth";

import classes from "./UserAvatar.module.scss";

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
            return "danger";
        }

        if (user.role === "Admin") {
            return "secondary";
        } else {
            return "accent";
        }
    }, [user]);

    return (
        <Avatar color={avatarColor} className={classes.userAvatar}>
            {userInitials}
        </Avatar>
    );
};
