import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import routes from "../routes";
import axios from "axios";
import useAuth from '../hooks/index.jsx'

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
        const response = await axios.post(routes.loginPath(), { ...userData });
        localStorage.setItem("userId", JSON.stringify(response.data));
        auth.logIn();
        console.log(location);
        const {from} = location.state || {from: {pathname: "/"}}
        console.log(from)
        navigate(from)
      } catch (e) {
        const message = e.response.statusText;
        console.log(e);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
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
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
