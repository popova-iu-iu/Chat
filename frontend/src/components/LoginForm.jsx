import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import routes from "../routes";
import axios from "axios";
import useAuth from "../hooks/index.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
    }),

    onSubmit: async (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      };
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } catch (e) {
        const message = e.response.statusText;
        console.log(e);
      }
    },
  });

  return (
    <>
      <Form
        className="col-12 col-md-6 mt-3 mt-mb-0"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center">Войти</h1>
        <Form.Group className="mb-3 form-floating">
          <Form.Control
            id="floatingLogin"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Ваш ник"
          />
          <Form.Label htmlFor="floatingLogin">Ваш ник</Form.Label>
          <Form.Text className="text-danger">
            {formik.errors.username && formik.touched.username
              ? formik.errors.username
              : null}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 form-floating">
          <Form.Control
            id="floatingPasword"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Пароль"
          />
          <Form.Label htmlFor="floatingPassword">Пароль</Form.Label>
          <Form.Text className="text-danger">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100 mb-3">
          Войти
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
