import dayjs from "dayjs";

import { User, UserDto } from "@/types/Auth";

export const mapUserDtoToUser = (dto: UserDto): User => {
    return {
        id: dto.id,
        name: dto.displayName,
        login: dto.name,
        role: dto.role,
        areReservationsForbidden: dto.reservationDisabled,
        gymPassExpirationTime: getExpirationTime(dto),
    };
};

const getExpirationTime = (dto: UserDto): Date | null => {
    const hasInfiniteAccess = dto.subscriptionIsActive && !dto.subscriptionExpiresAt;

    if (!dto.subscriptionIsActive) {
        return null;
    } else if (hasInfiniteAccess) {
        return dayjs().add(100, "years").toDate();
    } else {
        return dto.subscriptionExpiresAt ? dayjs(dto.subscriptionExpiresAt).toDate() : null;
    }
};
