import { noop } from "@mantine/core";

import { Modal } from "../../../../../../../common/components/Modals";
import { useTranslate } from "../../../../../../../common/i18n";

export const DeleteActivityModal = () => {
    const translate = useTranslate();

    return (
        <Modal.Wrapper>
            <Modal.Title>{translate("pages.adminDashboard.activitiesPanel.deleteModal.header")}</Modal.Title>
            <Modal.Caption>{translate("pages.adminDashboard.activitiesPanel.deleteModal.caption")}</Modal.Caption>
            <Modal.Footer onSubmit={noop} submitButton={{ children: "Confirm", color: "danger" }} />
        </Modal.Wrapper>
    );
};
