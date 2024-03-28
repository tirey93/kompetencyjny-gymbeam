import { useEffect, useState } from "react";
import { Group, Text } from "@mantine/core";

export const Timestamp = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Group>
            <Text fz="xl" fw={700}>
                {currentDateTime.toLocaleTimeString()}
            </Text>
            <Text fz="xl" fw={500} c="dimmed">
                {currentDateTime.toLocaleDateString()}
            </Text>
        </Group>
    );
};
