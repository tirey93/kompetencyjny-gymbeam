import { ActivityIcon } from "@/features/activities/components/ActivityIcon/ActivityIcon";
import { StyledActivityItem } from "@/features/activities/components/ActivityItem/styled";

type ActivityItemProps = {
    name: string;
};

export const ActivityItem = ({ name }: ActivityItemProps) => {
    return (
        <StyledActivityItem.Container elevate>
            <StyledActivityItem.IconContainer>
                <ActivityIcon name={name} />
            </StyledActivityItem.IconContainer>
            <StyledActivityItem.Name>{name}</StyledActivityItem.Name>
            <StyledActivityItem.ChevronIcon />
        </StyledActivityItem.Container>
    );
};
