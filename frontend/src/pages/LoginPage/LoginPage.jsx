import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Container, Card, Image } from "react-bootstrap";
import LoginForm from "../../components/LoginForm";
import Header from "../../components/Header";
import image from "../../../src/assets/avatar.jpg";

const LoginPage = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                className="col-12 d-flex align-items-center justify-content-center"
                md={6}
              >
                <Image className="rounded-circle" src={image} alt="Enter" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="px-1">Нет аккаунта? </span>
                <Link to="/sign-up">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
