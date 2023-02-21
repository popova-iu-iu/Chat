import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import routes from "../routes";
import axios from "axios";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

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
        logIn({ ...response.data });
        navigate("/");
        console.log(response.data);
      } catch (e) {
        const message = e.response.statusText;
        console.log(message);
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
