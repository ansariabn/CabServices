import React, { useState } from "react"

const CabFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		const filteredRooms = data.filter((cab) =>
			cab.cabType.toLowerCase().includes(selectedType.toLowerCase())
		)
		setFilteredData(filteredRooms)
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const cabTypes = ["", ...new Set(data.map((cab) => cab.cabType))]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="cab-type-filter">
				FIlter rooms by type
			</span>
			<select
				className="form-select"
				aria-label="cab-type-filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a cab type to filter....</option>
				{cabTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
	)
}
export default CabFilter
