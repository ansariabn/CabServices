import React, { useEffect, useState } from "react"
import { getAllCabs } from "../utils/ApiFunctions"
import RoomCard from "./CabCard"
import { Col, Container, Row } from "react-bootstrap"
import CabFilter from "../common/CabFilter"
import RoomPaginator from "../common/CabPaginator"

const Cab = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [cabsPerPage] = useState(4)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getAllCabs()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
				console.log(data.length)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading rooms.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	
	}

	const totalPages = Math.ceil(filteredData.length / cabsPerPage)

	const renderRooms = () => {
		const startIndex = (currentPage - 1) * cabsPerPage
		const endIndex = startIndex + cabsPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((Cab) => <RoomCard key={Cab.id} Cab={Cab} />)
				

	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<CabFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderRooms()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default Cab
