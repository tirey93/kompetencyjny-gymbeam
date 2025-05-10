export const Screens = {
    Landing: "/(auth)/index",
    SignUp: "/(auth)/sign-up",
    SignIn: "/(auth)/sign-in",
    Dashboard: "(dashboard)",
    GymPass: "/(dashboard)/gym-pass",
    Activities: "/(dashboard)/activities",
    Activity: "/(dashboard)/activities/[id]",
    Profile: "/(dashboard)/profile",
    Reservations: "/(dashboard)/reservations",
    ChangePassword: "/(user)/change-password",
    Payment: "/(subscription)/payment",
} as const;
