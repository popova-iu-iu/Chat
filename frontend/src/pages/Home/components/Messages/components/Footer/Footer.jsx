/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import { useSelector } from 'react-redux';
import useChatApi from '../../../../../../hooks/useChatApi';

const Footer = () => {
  const { t } = useTranslation();
  const { sendMessage } = useChatApi();

  const inputRef = useRef(null);

  const currentChannelId = useSelector(
    ({ channels }) => channels.currentChannelId,
  );

  const { username } = JSON.parse(localStorage.getItem('userId'));
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      if (message !== '') {
        const cleanedMessage = leoProfanity.clean(message);
        const data = {
          body: cleanedMessage,
          channelId: currentChannelId,
          username,
        };

        sendMessage(data);

        resetForm();
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  const { values, handleSubmit, handleChange } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              placeholder={t('message.input')}
              aria-label={t('message.newMessage')}
              value={values.message}
              onChange={handleChange}
              ref={inputRef}
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
