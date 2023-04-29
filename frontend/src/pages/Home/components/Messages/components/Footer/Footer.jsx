import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import useChatApi from "../../../../../../hooks/useChatApi";
import { useSelector } from "react-redux";

const Footer = () => {
  const { t } = useTranslation();
  const { sendMessage } = useChatApi();

  const currentChannelId = useSelector(
    ({ channels }) => channels.currentChannelId
  );

  const { username } = JSON.parse(localStorage.getItem("userId"));
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: ({ message }, { resetForm }) => {
      if (message !== "") {
        const data = { body: message, channelId: currentChannelId, username };

        sendMessage(data);

        resetForm();
      }
    },
  });

  const { values, handleSubmit, handleChange } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              placeholder={t("message.input")}
              aria-label="message"
              value={values.message}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="link"
              className="btn-group-vertical text-dark"
            >
              <ArrowRightSquare size={20} />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Footer;
