import React from 'react';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';

import RegistrationForm from './components/RegistrationForm';
import reg from '../../assets/reg.jpg';

const Register = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12" md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col
              className="col-12 d-flex align-items-center justify-content-center"
              md={6}
            >
              <Image className="rounded-circle" src={reg} alt="Enter" />
            </Col>
            <RegistrationForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
export default Register;
