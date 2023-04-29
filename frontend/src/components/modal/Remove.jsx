import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import useChatApi from "../../hooks/useChatApi";

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const { deleteChannel } = useChatApi();

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const handleDelete = () => {
    deleteChannel(channelId, handleClose);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.remove")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t("modal.sure")}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t("modal.cancel")}
          </Button>

          <Button type="submit" variant="danger" onClick={handleDelete}>
            {t("modal.remove")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
