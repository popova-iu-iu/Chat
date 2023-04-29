import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, FloatingLabel, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import routes from "../../../routes/routes";
import useAuth from "../../../hooks/useAuth";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);
  const authMessage = t("login.authFailed");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t("registration.required")),
    password: Yup.string().required(t("registration.required")),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(response.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return false;
        }

        throw err;
      }
    },
  });
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">Войти</h1>

      <FloatingLabel
        label={t("login.name")}
        controlId="username"
        className="mb-3"
      >
        <Form.Control
          name="username"
          autoComplete="username"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={
            (formik.touched.username && !!formik.errors.username) || authFailed
          }
        />
        <Form.Text className="text-danger">
          {formik.errors.username && formik.touched.username
            ? formik.errors.username
            : null}
        </Form.Text>
      </FloatingLabel>

      <FloatingLabel
        label={t("login.password")}
        controlId="password"
        className="mb-4"
      >
        <FormControl
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={
            (formik.touched.username && !!formik.errors.username) || authFailed
          }
        />

        <FormControl.Feedback type="invalid" tooltip>
          {formik.errors.password ?? authMessage}
        </FormControl.Feedback>
      </FloatingLabel>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t("login.enter")}
      </Button>
    </Form>
  );
};

export default LoginForm;
