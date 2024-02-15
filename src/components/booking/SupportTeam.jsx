import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaClock, FaSnowflake, FaPhone, FaWhatsapp, FaInstagram } from "react-icons/fa";

const SupportTeam = () => {
  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">24 hour's Services</h2>
        <h2 className="text-center text-success mb-4">
          Thanks For Reaching Out
        </h2>

      </div>
      <div className="container">
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="cab-color">
                  <FaWhatsapp /> Text & Call
                </Card.Title>
                <Card.Text>9004125786</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="cab-color">
                  <FaInstagram /> Connect
                </Card.Title>
                <Card.Text>
                  connect with Instagram account
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
    </>
  );
};
export default SupportTeam;
