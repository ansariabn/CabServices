import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingCabs from "./components/cab/ExistingCabs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditCab from "./components/cab/EditCab"
import AddCab from "./components/cab/AddCab"
import NavBar from "./components/layout/NavBar"
import PageNotFound from "./components/layout/PageNotFound"
import Footer from "./components/layout/Footer"
import CabListing from "./components/cab/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/AtTravel"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import SupportTeam from "./components/booking/SupportTeam";


function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-cab/:cabId" element={<EditCab />} />
						<Route path="/existing-cabs" element={<ExistingCabs />} />
						<Route path="/add-cab" element={<AddCab />} />

						<Route
							path="/book-cab/:cabId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>
						<Route path="/browse-all-cab" element={<CabListing />} />

						<Route path="/admin" element={<Admin />} />
						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />
						<Route path="/call-support" element={<SupportTeam />} />



						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />

						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<Logout/>} />
						<Route path="*" element={<PageNotFound/>} />


					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App
