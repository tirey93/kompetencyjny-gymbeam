import { noop } from "@mantine/core";

import { useTranslate } from "../../../i18n";
import { Modal } from "..";

export const DeleteActivityModal = () => {
    const translate = useTranslate();

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("modals.activities.delete.header")}</Modal.Title>
            <Modal.Caption>{translate("modals.activities.delete.caption")}</Modal.Caption>
            <Modal.Footer onSubmit={noop} submitButton={{ children: "Confirm", color: "danger" }} />
        </Modal.Wrapper>
    );
};
