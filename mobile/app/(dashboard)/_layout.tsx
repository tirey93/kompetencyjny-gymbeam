import { Redirect, Tabs } from "expo-router";
import { QrCodeIcon, UserIcon, VolleyballIcon } from "lucide-react-native";
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
                    backgroundColor: "#232323",
                    borderTopWidth: 0,
                    height: 60,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: theme.accent6?.val,
                tabBarInactiveTintColor: "#c5c5c5",
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
