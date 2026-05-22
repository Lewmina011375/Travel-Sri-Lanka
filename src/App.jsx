import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Hotels from './pages/Hotels';
import Vehicles from './pages/Vehicles';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPlaces from './pages/admin/AdminPlaces';
import AdminHotels from './pages/admin/AdminHotels';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminBookings from './pages/admin/AdminBookings';
import AdminReviews from './pages/admin/AdminReviews';

export default function App() {
	return (
		<Routes>
			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<AdminDashboard />} />
				<Route path="users" element={<AdminUsers />} />
				<Route path="places" element={<AdminPlaces />} />
				<Route path="hotels" element={<AdminHotels />} />
				<Route path="vehicles" element={<AdminVehicles />} />
				<Route path="bookings" element={<AdminBookings />} />
				<Route path="reviews" element={<AdminReviews />} />
			</Route>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/places" element={<Places />} />
				<Route path="/places/:id" element={<PlaceDetail />} />
				<Route path="/hotels" element={<Hotels />} />
				<Route path="/vehicles" element={<Vehicles />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
}
