import { Link } from "expo-router";

import { Screens } from "@/constants/Screens";
import { ActivityIcon } from "@/features/activities/components/ActivityIcon/ActivityIcon";
import { StyledActivityItem } from "@/features/activities/components/ActivityItem/styled";

type ActivityItemProps = {
    name: string;
    id: number;
};

export const ActivityItem = ({ name, id }: ActivityItemProps) => {
    return (
        <Link
            asChild
            href={{
                pathname: Screens.Activity,
                params: { id },
            }}
        >
            <StyledActivityItem.Container elevate>
                <StyledActivityItem.IconContainer>
                    <ActivityIcon name={name} />
                </StyledActivityItem.IconContainer>
                <StyledActivityItem.Name>{name}</StyledActivityItem.Name>
                <StyledActivityItem.ChevronIcon />
            </StyledActivityItem.Container>
        </Link>
    );
};
