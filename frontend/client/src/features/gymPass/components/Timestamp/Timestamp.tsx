import { useEffect, useState } from "react";
import { Group, Text } from "@mantine/core";

import classes from "./Timestamp.module.scss";

export const Timestamp = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Group className={classes.timestamp}>
            <Text className={classes.time}>{currentDateTime.toLocaleTimeString()}</Text>
            <Text className={classes.date}>{currentDateTime.toLocaleDateString()}</Text>
        </Group>
    );
};
