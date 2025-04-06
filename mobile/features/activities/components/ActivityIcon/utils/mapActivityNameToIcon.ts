import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IconComponent = typeof FontAwesome5 | typeof Ionicons | typeof MaterialCommunityIcons | typeof MaterialIcons;

type IconMetadata = {
    component: IconComponent;
    name: string;
};

const iconsMap: Record<string, IconMetadata> = {
    bodypump: { component: MaterialCommunityIcons, name: "weight-lifter" },
    boxing: { component: MaterialCommunityIcons, name: "boxing-glove" },
    fbw: { component: Ionicons, name: "body" },
    cycling: { component: MaterialCommunityIcons, name: "bike" },
    hiit: { component: MaterialCommunityIcons, name: "fire" },
    jumprope: { component: MaterialCommunityIcons, name: "jump-rope" },
    kickboxing: { component: MaterialIcons, name: "sports-martial-arts" },
    pilates: { component: MaterialCommunityIcons, name: "yoga" },
    running: { component: FontAwesome5, name: "running" },
    stretching: { component: MaterialCommunityIcons, name: "human-handsup" },
    yoga: { component: MaterialCommunityIcons, name: "meditation" },
};

const defaultIcon: IconMetadata = {
    component: MaterialCommunityIcons,
    name: "dumbbell",
};

export const mapActivityNameToIcon = (activityName: string): IconMetadata => {
    const normalizedName = activityName.toLowerCase().replace(/\s/g, "");
    const icon = iconsMap[normalizedName];
    return icon ?? defaultIcon;
};
