import {createTheme} from "@mantine/core";

export const theme = createTheme({
    autoContrast: true,
    luminanceThreshold: 0.65,
    primaryColor: "red",
    colors: {
        primary: ["#ebedff", "#d1d6f9", "#a0a9f6", "#6c7af4", "#4352f2", "#2d39f2", "#232df3", "#1a22d9", "#121dc2", "#0317aa"],
        secondary: ["#f1eefc", "#ded8f2", "#bdade7", "#9880dd", "#7a59d5", "#6741d0", "#5d35cf", "#4e29b7", "#4424a4", "#3a1d91"],
        tertiary: ["#e1f9ff", "#ccedff", "#9ad7ff", "#64c1ff", "#3baefe", "#20a2fe", "#099cff", "#0088e4", "#0078cd", "#0069b6"],
        success: [
            "#e5fff0",
            "#d3f8e5",
            "#abefc9",
            "#7ee6ad",
            "#58de95",
            "#41d985",
            "#31d77c",
            "#21be69",
            "#13aa5c",
            "#00924c"
        ],
        error: [
            "#ffeaec",
            "#fdd4d6",
            "#f4a7ac",
            "#ec777e",
            "#e64f57",
            "#e3353f",
            "#e22732",
            "#c91a25",
            "#b31220",
            "#9e0419"
        ],
        warning: [
            "#fff4e2",
            "#ffe9cc",
            "#ffd09c",
            "#fdb766",
            "#fca13a",
            "#fb931d",
            "#fc8c0c",
            "#e17900",
            "#c86a00",
            "#ae5a00"
        ],
        info: [
            "#e1f9ff",
            "#ccedff",
            "#9ad7ff",
            "#64c1ff",
            "#3baefe",
            "#20a2fe",
            "#099cff",
            "#0088e4",
            "#0078cd",
            "#0069b6"
        ]
    },
    defaultGradient: {
        from: "orange",
        to: "red",
        deg: 45
    },
    defaultRadius: "md",
})
