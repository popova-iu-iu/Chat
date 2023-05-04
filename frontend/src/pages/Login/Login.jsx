import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForm from './Components/LoginForm';
import img from '../../assets/avatar.jpg';

const Login = () => {
  const { t } = useTranslation();
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
                <Image className="rounded-circle" src={img} alt={t('login.enter')} />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="px-1">{t('login.noAccaunt')}</span>
                <Link to="/signup">{t('login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
