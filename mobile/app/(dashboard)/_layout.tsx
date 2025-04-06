import { Redirect, Tabs } from "expo-router";
import { ListChecksIcon, QrCodeIcon, UserIcon, VolleyballIcon } from "lucide-react-native";
import { useTheme } from "tamagui";

import { Screens } from "@/constants/Screens";
import { useAuthState } from "@/features/auth";

export default function DashboardLayout() {
    const { isSignedIn } = useAuthState();
    const theme = useTheme();

    if (!isSignedIn) {
        return <Redirect href={Screens.SignIn} />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.secondary4?.val,
                    borderColor: theme.secondary10?.val,
                    borderTopWidth: 1,
                    height: 60,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: theme.accent6?.val,
                tabBarInactiveTintColor: theme.secondary11?.val,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Tabs.Screen
                name="activities"
                options={{
                    title: "Activities",
                    tabBarIcon: ({ color, size }) => <VolleyballIcon color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="reservations"
                options={{
                    title: "Reservations",
                    tabBarIcon: ({ color, size }) => <ListChecksIcon color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="gym-pass"
                options={{
                    title: "Gym Pass",
                    tabBarIcon: ({ color, size }) => <QrCodeIcon color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
