import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const CabCard = ({ cab }) => {
	return (
		<Col key={cab.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/book-cab/${cab.id}`}>
							<Card.Img
								variant="top"
								src={`data:image/png;base64, ${cab.photo}`}
								alt="cab Photo"
								style={{ width: "100%", maxWidth: "200px", height: "auto" }}
							/>
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="cab-color">{cab.cabType}</Card.Title>
						<Card.Title className="cab-price">{cab.cabPrice} / night</Card.Title>
						<Card.Text>Some cab information goes here for the guest to read through</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/book-cab/${cab.id}`} className="btn btn-hotel btn-sm">
							Book Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default CabCard
