import {createTheme} from "@mantine/core";

export const theme = createTheme({
    autoContrast: true,
    luminanceThreshold: 0.65,
    colors: {
        primary: ["#ebedff", "#d1d6f9", "#a0a9f6", "#6c7af4", "#4352f2", "#2d39f2", "#232df3", "#1a22d9", "#121dc2", "#0317aa"],
        secondary: ["#f1eefc", "#ded8f2", "#bdade7", "#9880dd", "#7a59d5", "#6741d0", "#5d35cf", "#4e29b7", "#4424a4", "#3a1d91"],
        tertiary: ["#e1f9ff", "#ccedff", "#9ad7ff", "#64c1ff", "#3baefe", "#20a2fe", "#099cff", "#0088e4", "#0078cd", "#0069b6"],
    },
    defaultGradient: {
        from: "orange",
        to: "red",
        deg: 45
    },
    defaultRadius: "md",
})
