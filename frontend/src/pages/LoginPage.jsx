import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="col-6">
            <h1>Войти</h1>
            <LoginForm />
            <div className="text-center">
              Нет аккаунта? <Link to="/sign-up">Регистрация</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
