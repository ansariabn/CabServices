import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaSnowflake,
	FaWifi
} from "react-icons/fa"

const CabService = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Our Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
						Services at <span className="cab-color"> Family - </span>Tour & Travel
						<span className="gap-2">
							<FaClock className="ml-5" /> 24-Hour Pick and Drop From Any Where
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="cab-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Stay connected with high-speed internet access.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="cab-color">
									<FaSnowflake /> Air conditioning
								</Card.Title>
								<Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default CabService
