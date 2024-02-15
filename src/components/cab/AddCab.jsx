import React, { useState } from "react"
import { addCab } from "../utils/ApiFunctions"
import CabTypeSelector from "../common/CabTypeSelector"
import { Link } from "react-router-dom"

const AddCab = () => {
	const [newCab, setNewCab] = useState({
		photo: null,
		cabType: "",
		cabPrice: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleCabInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "cabPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewCab({ ...newCab, [name]: value })
	}

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewCab({ ...newCab, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addCab(newCab.photo, newCab.cabType, newCab.cabPrice)
			if (success !== undefined) {
				setSuccessMessage("A new cab was  added successfully !")
				setNewCab({ photo: null, cabType: "", cabPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new cab")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New cab</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="cabType" className="form-label">
									cab Type
								</label>
								<div>
									<CabTypeSelector
										handleCabInputChange={handleCabInputChange}
										newCab={newCab}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="cabPrice" className="form-label">
									cab Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="cabPrice"
									name="cabPrice"
									value={newCab.cabPrice}
									onChange={handleCabInputChange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									cab Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview  cab photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-cabs"} className="btn btn-outline-info">
									Existing rooms
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save cab
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddCab
