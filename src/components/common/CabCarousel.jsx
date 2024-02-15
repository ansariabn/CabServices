import React, { useEffect, useState } from "react"
import { getAllCabs } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const CabCarousel = () => {
	const [cabs, setCabs] = useState([{ id: "", cabType: "", cabPrice: "", photo: "" }])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllCabs()
			.then((data) => {
				setCabs(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading cabs....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

	return (
		<section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/browse-all-cab"} className="hote-color text-center btn btn-primary mb-5">
				Browse all cabs
			</Link>

			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(cabs.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{cabs.slice(index * 4, index * 4 + 4).map((cab) => (
									<Col key={cab.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/book-cab/${cab.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${cab.photo}`}
													alt="cab Photo"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="cab-color">{cab.cabType}</Card.Title>
												<Card.Title className="cab-price">₹{cab.cabPrice}/night</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/book-cab/${cab.id}`} className="btn btn-hotel btn-sm">
														Book Now
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	)
}

export default CabCarousel
