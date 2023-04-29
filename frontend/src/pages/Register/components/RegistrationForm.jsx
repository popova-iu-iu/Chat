import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Form, FloatingLabel, FormControl, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useRollbar } from "@rollbar/react";

import routes from "../../../routes/routes";
import useAuth from "../../../hooks/useAuth";

const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rollbar = useRollbar();

  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t("registration.minMax"))
      .max(20, t("registration.minMax"))
      .required(t("registration.required")),
    password: Yup.string()
      .min(6, t("registration.passwordLength"))
      .required(t("registration.required")),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      t("registration.mustMatch")
    ),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { username: "", password: "", passwordConfirm: "" },
    onSubmit: async (values) => {
      try {
        const authResponse = await axios.post(routes.signupPath(), values);

        localStorage.setItem("userId", JSON.stringify(authResponse.data));
        auth.logIn();
        navigate("/");
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
          setAuthFailed(true);
          rollbar.err(err);

          return false;
        }

        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          setAuthFailed(true);
          setExistingUser(true);
          rollbar.err(err);

          return false;
        }

        throw err;
      }
    },
  });

  const { touched, errors, values, handleSubmit, handleChange } = formik;

  const onChange = (e) => {
    if (existingUser) {
      setExistingUser(false);
    }
    handleChange(e);
  };
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">{t("registration.registration")}</h1>

      <FloatingLabel
        label={t("registration.name")}
        controlId="username"
        className="mb-3"
      >
        <Form.Control
          name="username"
          autoComplete="username"
          placeholder={t("registration.name")}
          ref={inputRef}
          value={values.username}
          onChange={onChange}
          isInvalid={
            (touched.username && !!errors.username && existingUser) ||
            authFailed
          }
        />

        {(existingUser || !!errors.username) && (
          <FormControl.Feedback type="invalid" tooltip>
            {existingUser ? t("registration.exist") : errors.username}
          </FormControl.Feedback>
        )}
      </FloatingLabel>

      <FloatingLabel
        label={t("registration.password")}
        controlId="password"
        className="mb-3"
      >
        <FormControl
          type="password"
          name="password"
          placeholder={t("registration.password")}
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          isInvalid={(touched.password && !!errors.password) || authFailed}
        />

        {!!errors.password && (
          <FormControl.Feedback type="invalid" tooltip>
            {errors.password}
          </FormControl.Feedback>
        )}
      </FloatingLabel>

      <FloatingLabel
        label={t("registration.passwordConfirm")}
        controlId="password-confirm"
        className="mb-4"
      >
        <FormControl
          type="password"
          name="passwordConfirm"
          placeholder={t("signup.confirm")}
          autoComplete="new-password"
          value={values.passwordConfirm}
          onChange={handleChange}
          isInvalid={
            (touched.passwordConfirm && !!errors.passwordConfirm) || authFailed
          }
        />

        {!!errors.passwordConfirm && (
          <FormControl.Feedback type="invalid" tooltip>
            {errors.passwordConfirm}
          </FormControl.Feedback>
        )}
      </FloatingLabel>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t("registration.submit")}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
