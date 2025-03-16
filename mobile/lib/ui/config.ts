import * as Colors from "@tamagui/colors";
import { defaultConfig } from "@tamagui/config/v4";
import { createThemes, defaultComponentThemes } from "@tamagui/theme-builder";
import { createTamagui } from "tamagui";

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
            dark: [
                "hsla(253, 15%, 1%, 1)",
                "hsla(253, 15%, 6%, 1)",
                "hsla(253, 15%, 12%, 1)",
                "hsla(253, 15%, 17%, 1)",
                "hsla(253, 15%, 23%, 1)",
                "hsla(253, 15%, 28%, 1)",
                "hsla(253, 15%, 34%, 1)",
                "hsla(253, 15%, 39%, 1)",
                "hsla(253, 15%, 45%, 1)",
                "hsla(253, 15%, 50%, 1)",
                "hsla(0, 15%, 93%, 1)",
                "hsla(0, 15%, 99%, 1)",
            ],
            light: [
                "hsla(253, 15%, 95%, 1)",
                "hsla(253, 15%, 93%, 1)",
                "hsla(253, 15%, 90%, 1)",
                "hsla(253, 15%, 87%, 1)",
                "hsla(253, 15%, 84%, 1)",
                "hsla(253, 15%, 80%, 1)",
                "hsla(253, 15%, 76%, 1)",
                "hsla(253, 15%, 72%, 1)",
                "hsla(253, 15%, 68%, 1)",
                "hsla(253, 15%, 60%, 1)",
                "hsla(0, 15%, 15%, 1)",
                "hsla(0, 15%, 1%, 1)",
            ],
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
                "hsla(252, 100%, 0%, 1)",
                "hsla(252, 100%, 7%, 1)",
                "hsla(253, 100%, 13%, 1)",
                "hsla(253, 100%, 20%, 1)",
                "hsla(254, 100%, 27%, 1)",
                "hsla(254, 100%, 33%, 1)",
                "hsla(255, 100%, 40%, 1)",
                "hsla(255, 100%, 47%, 1)",
                "hsla(256, 100%, 53%, 1)",
                "hsla(256, 100%, 60%, 1)",
                "hsla(250, 50%, 90%, 1)",
                "hsla(250, 50%, 95%, 1)",
            ],
            light: [
                "hsla(256, 100%, 3%, 1)",
                "hsla(256, 100%, 10%, 1)",
                "hsla(256, 100%, 17%, 1)",
                "hsla(256, 100%, 24%, 1)",
                "hsla(256, 100%, 31%, 1)",
                "hsla(256, 100%, 37%, 1)",
                "hsla(256, 100%, 44%, 1)",
                "hsla(256, 100%, 51%, 1)",
                "hsla(256, 100%, 58%, 1)",
                "hsla(256, 100%, 65%, 1)",
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

export const config = createTamagui({
    ...defaultConfig,
    settings: {
        ...defaultConfig.settings,
        onlyAllowShorthands: false,
    },
    themes,
});

type Conf = typeof config;

declare module "tamagui" {
    interface TamaguiCustomConfig extends Conf {}
}
