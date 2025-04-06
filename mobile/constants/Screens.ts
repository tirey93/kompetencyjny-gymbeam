export const Screens = {
    Landing: "/(auth)/index",
    SignUp: "/(auth)/sign-up",
    SignIn: "/(auth)/sign-in",
    Dashboard: "(dashboard)",
    GymPass: "/(dashboard)/gym-pass",
    Activities: "/(dashboard)/activities",
    Activity: "/(dashboard)/activities/[name]",
    Profile: "/(dashboard)/profile",
    Reservations: "/(dashboard)/reservations",
    ChangePassword: "/(user)/change-password",
} as const;
