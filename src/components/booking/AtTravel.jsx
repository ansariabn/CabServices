import React, { useEffect, useState } from "react"
import BookingForm from "./BookingForm"
import {
	FaUtensils,
	FaWifi,
	FaTv
	
} from "react-icons/fa"

import { useParams } from "react-router-dom"
import { getCabById } from "../utils/ApiFunctions"
import CabCarousel from "../common/CabCarousel"

const AtTravel = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [cabInfo, setCabInfo] = useState({
		photo: "",
		cabType: "",
		cabPrice: ""
	})

	const { cabId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getCabById(cabId)
				.then((response) => {
					setCabInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [cabId])

	return (
		<div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading cab information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="cab-info">
								<img
									src={`data:image/png;base64,${cabInfo.photo}`}
									alt="cab photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>cab Type:</th>
											<td>{cabInfo.cabType}</td>
										</tr>
										<tr>
											<th>Price per Travel:</th>
											<td>${cabInfo.cabPrice}</td>
										</tr>
										<tr>
											<th>cab Service:</th>
											<td>
												<ul className="list-unstyled">
													<li>
														<FaWifi /> Wifi
													</li>
													<li>
														<FaTv /> Netfilx Premium
													</li>
													<li>
														<FaUtensils /> Breakfast
													</li>
													
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<BookingForm />
					</div>
				</div>
			</section>
			<div className="container">
				<CabCarousel />
			</div>
		</div>
	)
}
export default AtTravel
