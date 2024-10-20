import { QRCodeSVG } from "qrcode.react";

import { useTheme } from "@/lib/theme";

type GymPassQRProps = {
    qrValue: string;
};

export const GymPassQR = ({ qrValue }: GymPassQRProps) => {
    const { theme } = useTheme();

    return (
        <QRCodeSVG
            value={qrValue}
            size={256}
            bgColor={theme.colors?.secondary?.[7] ?? "#000000"}
            fgColor="#ffffff"
            includeMargin
            style={{
                borderRadius: theme.radius?.md ?? "0",
            }}
        />
    );
};
