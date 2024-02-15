import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* This function adds a new cab cab to the database */
export async function addCab(photo, cabType, cabPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("cabType", cabType)
	formData.append("cabPrice", cabPrice)

	const response = await api.post("/cabs/add/new-cab", formData)
		// headers: getHeader())
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function gets all cab types from thee database */
export async function getCabTypes() {
	try {
		const response = await api.get("/cabs/cab/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching cab types")
	}
}
/* This function gets all cabs from the database */
export async function getAllCabs() {
	try {
		const result = await api.get("/cabs/all-cabs")
		return result.data
	} catch (error) {
		throw new Error("Error fetching cabs")
	}
}

/* This function deletes a cab by the Id */
export async function deleteCab(cabId) {
	try {
		const result = await api.delete(`/cabs/delete/cab/${cabId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting cab ${error.message}`)
	}
}
/* This function update a cab */
export async function updateCab(cabId, cabData) {
	const formData = new FormData()
	formData.append("cabType", cabData.cabType)
	formData.append("cabPrice", cabData.cabPrice)
	formData.append("photo", cabData.photo)
	const response = await api.put(`/cabs/update/${cabId}`, formData,{
		headers: getHeader()
	})
	return response
}

/* This funcction gets a cab by the id */
export async function getCabById(cabId) {
	try {
		const result = await api.get(`/cabs/cab/${cabId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching cab ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookCab(cabId, booking) {
	try {
		const response = await api.post(`/bookings/cab/${cabId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking cab : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function gets all availavle cabs from the database with a given date and a cab type */
export async function getAvailableRooms(travelInDate, travelOutDate, cabType) {
	const result = await api.get(
		`cabs/available-cabs?travelInDate=${travelInDate}
		&travelOutDate=${travelOutDate}&cabType=${cabType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}
