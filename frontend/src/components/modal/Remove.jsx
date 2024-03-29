/* eslint-disable */
import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useChatApi from '../../hooks/useChatApi';
import { getChannelId } from '../../store/modal';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const channelId = useSelector(getChannelId);
  const { deleteChannel } = useChatApi();

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const notify = () => toast.success(t('channels.delete'));

  const handleSuccess = () => {
    handleClose();
    notify();
  };

  const handleDelete = () => {
    deleteChannel(channelId, handleSuccess);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modal.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>

          <Button type="submit" variant="danger" onClick={handleDelete}>
            {t('modal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
