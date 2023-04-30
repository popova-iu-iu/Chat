/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Form, Button, FormControl, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import useChatApi from '../../hooks/useChatApi';
import { selectors } from '../../store/channels';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const [show, setShow] = useState(true);
  const { newChannel } = useChatApi();

  const channelsNames = useSelector(selectors.selectAll).map(
    ({ name }) => name,
  );

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const notify = () => toast.success(t('channels.created'));

  const handleSuccess = () => {
    handleClose();
    notify();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('modal.required'))
      .min(3, t('modal.minMax'))
      .max(20, t('modal.minMax'))
      .notOneOf(channelsNames, t('modal.uniq')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { name: '' },
    onSubmit: ({ name }) => {
      const cleanedMessage = leoProfanity.clean(name);
      if (channelsNames.includes(cleanedMessage)) {
        return false;
      }

      if (!channelsNames.includes(name)) {
        newChannel(leoProfanity.clean(name), handleSuccess);
      }

      return true;
    },
  });

  const {
    touched, errors, values, handleSubmit, handleChange,
  } = formik;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            ref={inputRef}
            isInvalid={touched.name && !!errors.name}
          />
          <FormLabel className="visually-hidden" htmlFor="name">
            {t('modal.name')}
          </FormLabel>

          <FormControl.Feedback type="invalid">
            {errors.name}
          </FormControl.Feedback>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('modal.cancel')}
            </Button>

            <Button type="submit" variant="primary">
              {t('modal.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
