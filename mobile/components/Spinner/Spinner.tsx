import { Spinner as BaseSpinner } from "tamagui";

type SpinnerProps = {
    size?: "small" | "large";
};

export const Spinner = ({ size = "small" }: SpinnerProps) => {
    return <BaseSpinner size={size} color="$accent5" />;
};
