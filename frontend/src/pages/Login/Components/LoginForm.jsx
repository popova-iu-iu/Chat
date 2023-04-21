import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Form, FloatingLabel, FormControl, Button } from "react-bootstrap";
import * as Yup from "yup";

import routes from "../../../routes/routes";
import useAuth from "../../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      };
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(response.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } catch (e) {
        console.log(e);
      }
    },
  });
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">Войти</h1>

      <FloatingLabel label="Ваш ник" controlId="username" className="mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Text className="text-danger">
          {formik.errors.username && formik.touched.username
            ? formik.errors.username
            : null}
        </Form.Text>
      </FloatingLabel>

      <FloatingLabel label="Пароль" controlId="password" className="mb-4">
        <FormControl
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <Form.Text className="text-danger">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </Form.Text>
      </FloatingLabel>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
