import React, { useEffect, useState } from "react"
import { deleteCab, getAllCabs } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import CabFilter from "../common/CabFilter"
import RoomPaginator from "../common/CabPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingCabs = () => {
	const [cabs, setCabs] = useState([{ id: "", cabType: "", cabPrice: "" }])
	const [currentPage, setCurrentPage] = useState(1)
	const [cabsPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredCabs, setFilteredCabs] = useState([{ id: "", cabType: "", cabPrice: "" }])
	const [selectedCabType, setSelectedCabType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() => {
		fetchRooms()
	}, [])

	const fetchRooms = async () => {
		setIsLoading(true)
		try {
			const result = await getAllCabs()
			setCabs(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (selectedCabType === "") {
			setFilteredCabs(cabs)
		} else {
			const filteredCabs = cabs.filter((cab) => cab.cabType === selectedCabType)
			setFilteredCabs(filteredCabs)
		}
		setCurrentPage(1)
	}, [cabs, selectedCabType])

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleDelete = async (cabId) => {
		try {
			const result = await deleteCab(cabId)
			if (result === "") {
				setSuccessMessage(`cab No ${cabId} was delete`)
				fetchRooms()
			} else {
				console.error(`Error deleting cab : ${result.message}`)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	const calculateTotalPages = (filteredCabs, cabsPerPage, cabs) => {
		const totalRooms = filteredCabs.length > 0 ? filteredCabs.length : cabs.length
		return Math.ceil(totalRooms / cabsPerPage)
	}

	const indexOfLastCab = currentPage * cabsPerPage
	const indexOfFirstCab = indexOfLastCab - cabsPerPage
	const currentCabs = filteredCabs.slice(indexOfFirstCab, indexOfLastCab)

	return (
		<>
			<div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

			{isLoading ? (
				<p>Loading existing cabs</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h2>Existing Rooms</h2>
						</div>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<CabFilter data={cabs} setFilteredData={setFilteredCabs} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-cab"}>
									<FaPlus /> Add cab
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>cab Type</th>
									<th>cab Price</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentCabs.map((cab) => (
									<tr key={cab.id} className="text-center">
										<td>{cab.id}</td>
										<td>{cab.cabType}</td>
										<td>{cab.cabPrice}</td>
										<td className="gap-2">
											<Link to={`/edit-cab/${cab.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(cab.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<RoomPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredCabs, cabsPerPage, cabs)}
							onPageChange={handlePaginationClick}
						/>
					</section>
				</>
			)}
		</>
	)
}

export default ExistingCabs
