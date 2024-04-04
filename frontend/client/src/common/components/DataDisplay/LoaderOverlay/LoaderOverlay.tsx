import { LoadingOverlay } from "@mantine/core";

type LoaderOverlayProps = {
    visible: boolean;
};

export const LoaderOverlay = ({ visible }: LoaderOverlayProps) => {
    return <LoadingOverlay visible={visible} overlayProps={{ blur: 3 }} loaderProps={{ type: "bars" }} />;
};
