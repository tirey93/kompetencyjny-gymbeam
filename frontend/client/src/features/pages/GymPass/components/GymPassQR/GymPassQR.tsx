import { QRCodeSVG } from "qrcode.react";

import { theme } from "../../../../../common/theme/theme";

type GymPassQRProps = {
    qrValue: string;
};

export const GymPassQR = ({ qrValue }: GymPassQRProps) => {
    return (
        <QRCodeSVG
            value={qrValue}
            size={256}
            bgColor={theme.colors?.primary?.[7] ?? "#000000"}
            fgColor="#ffffff"
            includeMargin
            style={{
                borderRadius: theme.radius?.md ?? "0",
            }}
        />
    );
};
