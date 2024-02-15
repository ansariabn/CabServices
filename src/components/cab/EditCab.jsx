import React, { useEffect, useState } from "react"
import { getCabById, updateCab } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditCab = () => {
	const [cab, setCab] = useState({
		photo: "",
		cabType: "",
		cabPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { cabId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setCab({ ...cab, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setCab({ ...cab, [name]: value })
	}

	useEffect(() => {
		const fetchCab = async () => {
			try {
				const cabData = await getCabById(cabId)
				setCab(cabData)
				setImagePreview(cabData.photo)
			} catch (error) {
				console.error(error)
			}
		}

		fetchCab()
	}, [cabId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateCab(cabId, cab)
			if (response.status === 200) {
				setSuccessMessage("cab updated successfully!")
				const updatedCabData = await getCabById(cabId)
				setCab(updatedCabData)
				setImagePreview(updatedCabData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating cab")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit cab</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="cabType" className="form-label cab-color">
								cab Type
							</label>
							<input
								type="text"
								className="form-control"
								id="cabType"
								name="cabType"
								value={cab.cabType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="cabPrice" className="form-label cab-color">
								cab Price
							</label>
							<input
								type="number"
								className="form-control"
								id="cabPrice"
								name="cabPrice"
								value={cab.cabPrice}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label cab-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="cab preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-cabs"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit cab
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditCab
