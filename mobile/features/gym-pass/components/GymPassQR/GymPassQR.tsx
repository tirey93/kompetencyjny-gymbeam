import QRCode from "react-qr-code";

import { StyledGymPassQR } from "@/features/gym-pass/components/GymPassQR/styled";
import { GymPassEncoder } from "@/features/gym-pass/services/GymPassEncoder";
import { GymPassValidator } from "@/features/gym-pass/services/GymPassValidator";
import { User } from "@/types";

type GymPassQRProps = {
    owner: User;
};

export const GymPassQR = ({ owner }: GymPassQRProps) => {
    return (
        <StyledGymPassQR.Container>
            <StyledGymPassQR.Guard isDisabled={GymPassValidator.validate(owner)}>
                <QRCode bgColor="transparent" fgColor="#ffffff" value={GymPassEncoder.encode(owner)} />
            </StyledGymPassQR.Guard>
        </StyledGymPassQR.Container>
    );
};
