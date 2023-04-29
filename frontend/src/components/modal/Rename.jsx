import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Button, FormControl, FormLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import useChatApi from "../../hooks/useChatApi";
import { selectors } from "../../store/channels";

const Rename = ({ onHide }) => {
  const { t } = useTranslation();
  const { newNameChannel } = useChatApi();
  const inputRef = useRef(null);
  const [show, setShow] = useState(true);

  const channels = useSelector(selectors.selectAll);
  const channelId = useSelector((state) => state.modal.channelId);

  const channelsNames = channels.map(({ name }) => name);
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const { id, name } = currentChannel;

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("modal.required"))
      .min(3, t("modal.minMax"))
      .max(20, t("modal.minMax")),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { name },
    onSubmit: ({ name }) => {
      if (channelsNames.includes(name)) {
        return false;
      }

      if (!channelsNames.includes(name)) {
        newNameChannel({ id, name }, handleClose);
      }

      return true;
    },
  });

  const { touched, errors, values, handleSubmit, handleChange } = formik;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.rename")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormLabel className="visually-hidden" htmlFor="name">
            {t("modal.name")}
          </FormLabel>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            id="name"
            placeholder={t("modal.channelName")}
            ref={inputRef}
            autoComplete="current-password"
            value={values.name}
            onChange={handleChange}
            isInvalid={touched.name && !!errors.name}
          />

          <FormControl.Feedback type="invalid">
            {errors.name}
          </FormControl.Feedback>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t("modal.cancel")}
            </Button>

            <Button type="submit" variant="primary">
              {t("modal.submit")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
