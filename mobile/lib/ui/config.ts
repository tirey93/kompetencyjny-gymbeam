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

const darkPalette = [
    "hsla(280, 6%, 6%, 1)",
    "hsla(280, 6%, 11%, 1)",
    "hsla(280, 6%, 16%, 1)",
    "hsla(280, 6%, 21%, 1)",
    "hsla(280, 6%, 26%, 1)",
    "hsla(280, 6%, 30%, 1)",
    "hsla(280, 6%, 35%, 1)",
    "hsla(280, 6%, 40%, 1)",
    "hsla(280, 6%, 45%, 1)",
    "hsla(280, 6%, 50%, 1)",
    "hsla(0, 15%, 93%, 1)",
    "hsla(0, 15%, 99%, 1)",
];

const lightPalette = [
    "hsla(280, 6%, 99%, 1)",
    "hsla(280, 6%, 94%, 1)",
    "hsla(280, 6%, 88%, 1)",
    "hsla(280, 6%, 83%, 1)",
    "hsla(280, 6%, 77%, 1)",
    "hsla(280, 6%, 72%, 1)",
    "hsla(280, 6%, 66%, 1)",
    "hsla(280, 6%, 61%, 1)",
    "hsla(280, 6%, 55%, 1)",
    "hsla(280, 6%, 50%, 1)",
    "hsla(0, 15%, 15%, 1)",
    "hsla(0, 15%, 1%, 1)",
];

const successDark = {
    success1: "hsla(149, 76%, 26%, 1)",
    success2: "hsla(149, 76%, 30%, 1)",
    success3: "hsla(149, 76%, 34%, 1)",
    success4: "hsla(149, 76%, 37%, 1)",
    success5: "hsla(149, 76%, 41%, 1)",
    success6: "hsla(149, 76%, 45%, 1)",
    success7: "hsla(149, 76%, 49%, 1)",
    success8: "hsla(149, 76%, 52%, 1)",
    success9: "hsla(149, 76%, 56%, 1)",
    success10: "hsla(149, 76%, 60%, 1)",
    success11: "hsla(250, 50%, 90%, 1)",
    success12: "hsla(250, 50%, 95%, 1)",
};

const successLight = {
    success1: "hsla(149, 76%, 40%, 1)",
    success2: "hsla(149, 76%, 43%, 1)",
    success3: "hsla(149, 76%, 46%, 1)",
    success4: "hsla(149, 76%, 48%, 1)",
    success5: "hsla(149, 76%, 51%, 1)",
    success6: "hsla(149, 76%, 54%, 1)",
    success7: "hsla(149, 76%, 57%, 1)",
    success8: "hsla(149, 76%, 59%, 1)",
    success9: "hsla(149, 76%, 62%, 1)",
    success10: "hsla(149, 76%, 65%, 1)",
    success11: "hsla(250, 50%, 95%, 1)",
    success12: "hsla(250, 50%, 95%, 1)",
};

const successPalette = {
    dark: Object.values(successDark),
    light: Object.values(successLight),
};

const warningDark = {
    warning1: "hsla(40, 100%, 26%, 1)",
    warning2: "hsla(40, 100%, 30%, 1)",
    warning3: "hsla(40, 100%, 34%, 1)",
    warning4: "hsla(40, 100%, 37%, 1)",
    warning5: "hsla(40, 100%, 41%, 1)",
    warning6: "hsla(40, 100%, 45%, 1)",
    warning7: "hsla(40, 100%, 49%, 1)",
    warning8: "hsla(40, 100%, 52%, 1)",
    warning9: "hsla(40, 100%, 56%, 1)",
    warning10: "hsla(40, 100%, 60%, 1)",
    warning11: "hsla(40, 80%, 90%, 1)",
    warning12: "hsla(40, 80%, 95%, 1)",
};

const warningLight = {
    warning1: "hsla(40, 100%, 40%, 1)",
    warning2: "hsla(40, 100%, 43%, 1)",
    warning3: "hsla(40, 100%, 46%, 1)",
    warning4: "hsla(40, 100%, 48%, 1)",
    warning5: "hsla(40, 100%, 51%, 1)",
    warning6: "hsla(40, 100%, 54%, 1)",
    warning7: "hsla(40, 100%, 57%, 1)",
    warning8: "hsla(40, 100%, 59%, 1)",
    warning9: "hsla(40, 100%, 62%, 1)",
    warning10: "hsla(40, 100%, 65%, 1)",
    warning11: "hsla(40, 80%, 95%, 1)",
    warning12: "hsla(40, 80%, 95%, 1)",
};

const warningPalette = {
    dark: Object.values(warningDark),
    light: Object.values(warningLight),
};

const errorDark = {
    error1: "hsla(0, 76%, 26%, 1)",
    error2: "hsla(0, 76%, 30%, 1)",
    error3: "hsla(0, 76%, 34%, 1)",
    error4: "hsla(0, 76%, 37%, 1)",
    error5: "hsla(0, 76%, 41%, 1)",
    error6: "hsla(0, 76%, 45%, 1)",
    error7: "hsla(0, 76%, 49%, 1)",
    error8: "hsla(0, 76%, 52%, 1)",
    error9: "hsla(0, 76%, 56%, 1)",
    error10: "hsla(0, 76%, 60%, 1)",
    error11: "hsla(0, 50%, 90%, 1)",
    error12: "hsla(0, 50%, 95%, 1)",
};

const errorLight = {
    error1: "hsla(0, 76%, 40%, 1)",
    error2: "hsla(0, 76%, 43%, 1)",
    error3: "hsla(0, 76%, 46%, 1)",
    error4: "hsla(0, 76%, 48%, 1)",
    error5: "hsla(0, 76%, 51%, 1)",
    error6: "hsla(0, 76%, 54%, 1)",
    error7: "hsla(0, 76%, 57%, 1)",
    error8: "hsla(0, 76%, 59%, 1)",
    error9: "hsla(0, 76%, 62%, 1)",
    error10: "hsla(0, 76%, 65%, 1)",
    error11: "hsla(0, 50%, 95%, 1)",
    error12: "hsla(0, 50%, 95%, 1)",
};

const errorPalette = {
    dark: Object.values(errorDark),
    light: Object.values(errorLight),
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
                ...successLight,
                ...warningLight,
                ...errorLight,
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
            },
            dark: {
                ...successDark,
                ...warningDark,
                ...errorDark,
                ...darkShadows,
                shadowColor: darkShadows.shadow1,
            },
        },
    },

    accent: {
        palette: {
            dark: [
                "hsla(29, 72%, 40%, 1)",
                "hsla(29, 72%, 42%, 1)",
                "hsla(29, 72%, 44%, 1)",
                "hsla(29, 72%, 47%, 1)",
                "hsla(29, 72%, 49%, 1)",
                "hsla(29, 72%, 51%, 1)",
                "hsla(29, 72%, 53%, 1)",
                "hsla(29, 72%, 56%, 1)",
                "hsla(29, 72%, 58%, 1)",
                "hsla(29, 72%, 60%, 1)",
                "hsla(250, 50%, 90%, 1)",
                "hsla(250, 50%, 95%, 1)",
            ],
            light: [
                "hsla(29, 72%, 40%, 1)",
                "hsla(29, 72%, 43%, 1)",
                "hsla(29, 72%, 46%, 1)",
                "hsla(29, 72%, 48%, 1)",
                "hsla(29, 72%, 51%, 1)",
                "hsla(29, 72%, 54%, 1)",
                "hsla(29, 72%, 57%, 1)",
                "hsla(29, 72%, 59%, 1)",
                "hsla(29, 72%, 62%, 1)",
                "hsla(29, 72%, 65%, 1)",
                "hsla(250, 50%, 95%, 1)",
                "hsla(250, 50%, 95%, 1)",
            ],
        },
    },

    childrenThemes: {
        warning: {
            palette: warningPalette,
        },

        error: {
            palette: errorPalette,
        },

        success: {
            palette: successPalette,
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
