import * as Colors from "@tamagui/colors";
import { defaultConfig } from "@tamagui/config/v4";
import { createThemes, defaultComponentThemes } from "@tamagui/theme-builder";
import { createTamagui } from "tamagui";

const darkPalette = [
    "hsla(0, 15%, 1%, 1)",
    "hsla(0, 15%, 6%, 1)",
    "hsla(0, 15%, 12%, 1)",
    "hsla(0, 15%, 17%, 1)",
    "hsla(0, 15%, 23%, 1)",
    "hsla(0, 15%, 28%, 1)",
    "hsla(0, 15%, 34%, 1)",
    "hsla(0, 15%, 39%, 1)",
    "hsla(0, 15%, 45%, 1)",
    "hsla(0, 15%, 50%, 1)",
    "hsla(0, 15%, 93%, 1)",
    "hsla(0, 15%, 99%, 1)",
];
const lightPalette = [
    "hsla(0, 15%, 99%, 1)",
    "hsla(0, 15%, 94%, 1)",
    "hsla(0, 15%, 88%, 1)",
    "hsla(0, 15%, 83%, 1)",
    "hsla(0, 15%, 77%, 1)",
    "hsla(0, 15%, 72%, 1)",
    "hsla(0, 15%, 66%, 1)",
    "hsla(0, 15%, 61%, 1)",
    "hsla(0, 15%, 55%, 1)",
    "hsla(0, 15%, 50%, 1)",
    "hsla(0, 15%, 15%, 1)",
    "hsla(0, 15%, 1%, 1)",
];

const lightShadows = {
    shadow1: "rgba(0,0,0,0.04)",
    shadow2: "rgba(0,0,0,0.08)",
    shadow3: "rgba(0,0,0,0.16)",
    shadow4: "rgba(0,0,0,0.24)",
    shadow5: "rgba(0,0,0,0.32)",
    shadow6: "rgba(0,0,0,0.4)",
};

const darkShadows = {
    shadow1: "rgba(0,0,0,0.2)",
    shadow2: "rgba(0,0,0,0.3)",
    shadow3: "rgba(0,0,0,0.4)",
    shadow4: "rgba(0,0,0,0.5)",
    shadow5: "rgba(0,0,0,0.6)",
    shadow6: "rgba(0,0,0,0.7)",
};

const themes = createThemes({
    componentThemes: defaultComponentThemes,

    base: {
        palette: {
            dark: darkPalette,
            light: lightPalette,
        },

        extra: {
            light: {
                ...Colors.green,
                ...Colors.red,
                ...Colors.yellow,
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
            },
            dark: {
                ...Colors.greenDark,
                ...Colors.redDark,
                ...Colors.yellowDark,
                ...darkShadows,
                shadowColor: darkShadows.shadow1,
            },
        },
    },

    accent: {
        palette: {
            dark: [
                "hsla(25, 66%, 50%, 1)",
                "hsla(25, 66%, 51%, 1)",
                "hsla(25, 66%, 52%, 1)",
                "hsla(25, 66%, 53%, 1)",
                "hsla(25, 66%, 54%, 1)",
                "hsla(25, 66%, 56%, 1)",
                "hsla(25, 66%, 57%, 1)",
                "hsla(25, 66%, 58%, 1)",
                "hsla(25, 66%, 59%, 1)",
                "hsla(25, 66%, 60%, 1)",
                "hsla(250, 50%, 90%, 1)",
                "hsla(250, 50%, 95%, 1)",
            ],
            light: [
                "hsla(25, 66%, 57%, 1)",
                "hsla(25, 66%, 58%, 1)",
                "hsla(25, 66%, 59%, 1)",
                "hsla(25, 66%, 60%, 1)",
                "hsla(25, 66%, 61%, 1)",
                "hsla(25, 66%, 61%, 1)",
                "hsla(25, 66%, 62%, 1)",
                "hsla(25, 66%, 63%, 1)",
                "hsla(25, 66%, 64%, 1)",
                "hsla(25, 66%, 65%, 1)",
                "hsla(250, 50%, 95%, 1)",
                "hsla(250, 50%, 95%, 1)",
            ],
        },
    },

    childrenThemes: {
        warning: {
            palette: {
                dark: Object.values(Colors.yellowDark),
                light: Object.values(Colors.yellow),
            },
        },

        error: {
            palette: {
                dark: Object.values(Colors.redDark),
                light: Object.values(Colors.red),
            },
        },

        success: {
            palette: {
                dark: Object.values(Colors.greenDark),
                light: Object.values(Colors.green),
            },
        },
    },
});

export type Themes = typeof themes;
export const config = createTamagui({ ...themes, ...defaultConfig });

type Conf = typeof config;

declare module "tamagui" {
    interface TamaguiCustomConfig extends Conf {}
}
