import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Button, Form, Col, Row, Container } from "react-bootstrap";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Container>
        <Row>
          <Col className="col-6">
            <h1>Войти</h1>
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
            <div className="text-center">
              Нет аккаунта?<Link to="/sign-up">Регистрация</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
