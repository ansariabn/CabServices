import React, { useState, useEffect } from "react"
import { getCabTypes } from "../utils/ApiFunctions"

const CabTypeSelector = ({ handleRoomInputChange, newCab }) => {
	const [cabTypes, setCabTypes] = useState([""])
	const [showNewCabTypeInput, setShowNewCabTypeInput] = useState(false)
	const [newCabType, setNewCabType] = useState("")

	useEffect(() => {
		getCabTypes().then((data) => {
			setCabTypes(data)
		})
	}, [])

	const handleNewCabTypeInputChange = (e) => {
		setNewCabType(e.target.value)
	}

	const handleAddNewCabType = () => {
		if (newCabType !== "") {
			setCabTypes([...cabTypes, newCabType])
			setNewCabType("")
			setShowNewCabTypeInput(false)
		}
	}

	return (
		<>
			{cabTypes.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						name="cabType"
						onChange={(e) => {
							if (e.target.value === "Add New") {
								setShowNewCabTypeInput(true)
							} else {
								handleRoomInputChange(e)
							}
						}}
						value={newCab.cabType}>
						<option value="">Select a cab type</option>
						<option value={"Add New"}>Add New</option>
						{cabTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{showNewCabTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New cab Type"
									value={newCabType}
									onChange={handleNewCabTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewCabType}>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default CabTypeSelector
