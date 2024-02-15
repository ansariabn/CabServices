import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./CabSearchResult"
import RoomTypeSelector from "./CabTypeSelector"

const CabSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		travelInDate: "",
		travelOutDate: "",
		cabType: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [availableCabs, setAvailableCabs] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = (e) => {
		e.preventDefault()
		const checkInMoment = moment(searchQuery.travelInDate)
		const checkOutMoment = moment(searchQuery.travelOutDate)
		if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
			setErrorMessage("Please enter valid dates")
			return
		}
		if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
			setErrorMessage("Check-out date must be after check-in date")
			return
		}
		setIsLoading(true)
		getAvailableRooms(searchQuery.travelInDate, searchQuery.travelOutDate, searchQuery.cabType)
			.then((response) => {
				setAvailableCabs(response.data)
				setTimeout(() => setIsLoading(false), 2000)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery({ ...searchQuery, [name]: value })
		const travelInDate = moment(searchQuery.travelInDate)
		const travelOutDate = moment(searchQuery.travelOutDate)
		if (travelInDate.isValid() && travelOutDate.isValid()) {
			setErrorMessage("")
		}
	}
	const handleClearSearch = () => {
		setSearchQuery({
			travelInDate: "",
			travelOutDate: "",
			cabType: ""
		})
		setAvailableCabs([])
	}

	return (
		<>
			<Container className="shadow mt-n5 mb-5 py-5">
				<Form onSubmit={handleSearch}>
					<Row className="justify-content-center">
						<Col xs={12} md={3}>
							<Form.Group controlId="travelInDate">
								<Form.Label>travel-in Date</Form.Label>
								<Form.Control
									type="date"
									name="travelInDate"
									value={searchQuery.travelInDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="travelOutDate">
								<Form.Label>travel-out Date</Form.Label>
								<Form.Control
									type="date"
									name="travelOutDate"
									value={searchQuery.travelOutDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="cabType">
								<Form.Label>cab Type</Form.Label>
								<div className="d-flex">
									<RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										newCab={searchQuery}
									/>
									<Button variant="secondary" type="submit" className="ml-2">
										Search
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				{isLoading ? (
					<p className="mt-4">Finding availble cabs....</p>
				) : availableCabs ? (
					<RoomSearchResults results={availableCabs} onClearSearch={handleClearSearch} />
				) : (
					<p className="mt-4">No rooms available for the selected dates and cab type.</p>
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
			</Container>
		</>
	)
}

export default CabSearch
