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
    "hsla(260, 6%, 6%, 1)",
    "hsla(260, 6%, 11%, 1)",
    "hsla(260, 6%, 16%, 1)",
    "hsla(260, 6%, 21%, 1)",
    "hsla(260, 6%, 26%, 1)",
    "hsla(260, 6%, 30%, 1)",
    "hsla(260, 6%, 35%, 1)",
    "hsla(260, 6%, 40%, 1)",
    "hsla(260, 6%, 45%, 1)",
    "hsla(260, 6%, 50%, 1)",
    "hsla(0, 15%, 93%, 1)",
    "hsla(0, 15%, 99%, 1)",
];

const lightPalette = [
    "hsla(260, 6%, 99%, 1)",
    "hsla(260, 6%, 94%, 1)",
    "hsla(260, 6%, 88%, 1)",
    "hsla(260, 6%, 83%, 1)",
    "hsla(260, 6%, 77%, 1)",
    "hsla(260, 6%, 72%, 1)",
    "hsla(260, 6%, 66%, 1)",
    "hsla(260, 6%, 61%, 1)",
    "hsla(260, 6%, 55%, 1)",
    "hsla(260, 6%, 50%, 1)",
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

const dangerDark = {
    danger1: "hsla(0, 76%, 26%, 1)",
    danger2: "hsla(0, 76%, 30%, 1)",
    danger3: "hsla(0, 76%, 34%, 1)",
    danger4: "hsla(0, 76%, 37%, 1)",
    danger5: "hsla(0, 76%, 41%, 1)",
    danger6: "hsla(0, 76%, 45%, 1)",
    danger7: "hsla(0, 76%, 49%, 1)",
    danger8: "hsla(0, 76%, 52%, 1)",
    danger9: "hsla(0, 76%, 56%, 1)",
    danger10: "hsla(0, 76%, 60%, 1)",
    danger11: "hsla(0, 50%, 90%, 1)",
    danger12: "hsla(0, 50%, 95%, 1)",
};

const dangerLight = {
    danger1: "hsla(0, 76%, 40%, 1)",
    danger2: "hsla(0, 76%, 43%, 1)",
    danger3: "hsla(0, 76%, 46%, 1)",
    danger4: "hsla(0, 76%, 48%, 1)",
    danger5: "hsla(0, 76%, 51%, 1)",
    danger6: "hsla(0, 76%, 54%, 1)",
    danger7: "hsla(0, 76%, 57%, 1)",
    danger8: "hsla(0, 76%, 59%, 1)",
    danger9: "hsla(0, 76%, 62%, 1)",
    danger10: "hsla(0, 76%, 65%, 1)",
    danger11: "hsla(0, 50%, 95%, 1)",
    danger12: "hsla(0, 50%, 95%, 1)",
};

const dangerPalette = {
    dark: Object.values(dangerDark),
    light: Object.values(dangerLight),
};

const secondaryDark = {
    secondary1: "hsla(260, 76%, 5%, 1)",
    secondary2: "hsla(260, 76%, 8%, 1)",
    secondary3: "hsla(260, 76%, 12%, 1)",
    secondary4: "hsla(260, 76%, 20%, 1)",
    secondary5: "hsla(260, 76%, 25%, 1)",
    secondary6: "hsla(260, 76%, 35%, 1)",
    secondary7: "hsla(260, 76%, 40%, 1)",
    secondary8: "hsla(260, 76%, 45%, 1)",
    secondary9: "hsla(260, 76%, 50%, 1)",
    secondary10: "hsla(260, 76%, 60%, 1)",
    secondary11: "hsla(260, 50%, 90%, 1)",
    secondary12: "hsla(260, 50%, 95%, 1)",
};

const secondaryLight = {
    secondary1: "hsla(260, 76%, 40%, 1)",
    secondary2: "hsla(260, 76%, 43%, 1)",
    secondary3: "hsla(260, 76%, 46%, 1)",
    secondary4: "hsla(260, 76%, 48%, 1)",
    secondary5: "hsla(260, 76%, 51%, 1)",
    secondary6: "hsla(260, 76%, 54%, 1)",
    secondary7: "hsla(260, 76%, 57%, 1)",
    secondary8: "hsla(260, 76%, 59%, 1)",
    secondary9: "hsla(260, 76%, 62%, 1)",
    secondary10: "hsla(260, 76%, 65%, 1)",
    secondary11: "hsla(260, 50%, 95%, 1)",
    secondary12: "hsla(260, 50%, 97%, 1)",
};

const secondaryPalette = {
    dark: Object.values(secondaryDark),
    light: Object.values(secondaryLight),
};

const neutralDark = {
    neutral1: "hsla(260, 0%, 5%, 1)",
    neutral2: "hsla(260, 0%, 8%, 1)",
    neutral3: "hsla(260, 0%, 12%, 1)",
    neutral4: "hsla(260, 0%, 20%, 1)",
    neutral5: "hsla(260, 0%, 25%, 1)",
    neutral6: "hsla(260, 0%, 35%, 1)",
    neutral7: "hsla(260, 0%, 40%, 1)",
    neutral8: "hsla(260, 0%, 45%, 1)",
    neutral9: "hsla(260, 0%, 50%, 1)",
    neutral10: "hsla(260, 0%, 60%, 1)",
    neutral11: "hsla(260, 0%, 90%, 1)",
    neutral12: "hsla(260, 0%, 95%, 1)",
};

const neutralLight = {
    neutral1: "hsla(260, 0%, 40%, 1)",
    neutral2: "hsla(260, 0%, 43%, 1)",
    neutral3: "hsla(260, 0%, 46%, 1)",
    neutral4: "hsla(260, 0%, 48%, 1)",
    neutral5: "hsla(260, 0%, 51%, 1)",
    neutral6: "hsla(260, 0%, 54%, 1)",
    neutral7: "hsla(260, 0%, 57%, 1)",
    neutral8: "hsla(260, 0%, 59%, 1)",
    neutral9: "hsla(260, 0%, 62%, 1)",
    neutral10: "hsla(260, 0%, 65%, 1)",
    neutral11: "hsla(260, 0%, 95%, 1)",
    neutral12: "hsla(260, 0%, 97%, 1)",
};

const neutralPalette = {
    dark: Object.values(neutralDark),
    light: Object.values(neutralLight),
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
                ...secondaryLight,
                ...neutralLight,
                ...successLight,
                ...warningLight,
                ...dangerLight,
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
            },
            dark: {
                ...secondaryDark,
                ...neutralDark,
                ...successDark,
                ...warningDark,
                ...dangerDark,
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

        danger: {
            palette: dangerPalette,
        },

        success: {
            palette: successPalette,
        },

        secondary: {
            palette: secondaryPalette,
        },

        neutral: {
            palette: neutralPalette,
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
