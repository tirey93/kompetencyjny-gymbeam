import { createTheme } from "@mantine/core";

export const theme = createTheme({
    autoContrast: true,
    luminanceThreshold: 0.65,
    primaryColor: "primary",
    colors: {
        primary: [
            "#e1f9ff",
            "#ccedff",
            "#9ad7ff",
            "#64c1ff",
            "#3baefe",
            "#20a2fe",
            "#099cff",
            "#0088e4",
            "#0078cd",
            "#0069b6",
        ],
        secondary: [
            "#f6ecff",
            "#e7d6fb",
            "#caabf1",
            "#ac7ce8",
            "#9354e0",
            "#833cdb",
            "#7b2eda",
            "#6921c2",
            "#5d1cae",
            "#501599",
        ],
        accent: [
            "#fff4e2",
            "#ffe9cc",
            "#ffd09c",
            "#fdb766",
            "#fca13a",
            "#fb931d",
            "#fc8c0c",
            "#e17900",
            "#c86a00",
            "#ae5a00",
        ],
        dark: [
            "#efefef",
            "#c7c7c7",
            "#9e9e9e",
            "#54545a",
            "#3c3c50",
            "#323246",
            "#23233c",
            "#1c1c32",
            "#141428",
            "#0f0f1e",
        ],
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
            "#00924c",
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
            "#9e0419",
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
            "#ae5a00",
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
            "#0069b6",
        ],
    },
    defaultGradient: {
        from: "primary",
        to: "secondary",
        deg: 45,
    },
    defaultRadius: "md",
    radius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
        xl: "2rem",
    },
    spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "2rem",
    },
    fontFamily: "Montserrat, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    breakpoints: {
        xs: "36em",
        sm: "48em",
        md: "62em",
        lg: "75em",
        xl: "88em",
    },
});
