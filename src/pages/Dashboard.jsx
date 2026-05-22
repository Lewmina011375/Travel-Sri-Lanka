import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editForm, setEditForm] = useState({ fullName: '', email: '', username: '', password: '' });
	const [updateError, setUpdateError] = useState('');
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const raw = localStorage.getItem('travel_user');
		if (raw) setUser(JSON.parse(raw));
	}, []);

	const handleEditClick = () => {
		setEditForm({
			fullName: user.fullName || '',
			email: user.email || '',
			username: user.username || '',
			password: '',
		});
		setIsEditing(true);
		setUpdateError('');
		setUpdateSuccess(false);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setUpdateError('');
		setUpdateSuccess(false);

		if (!user.id) {
			setUpdateError('User ID not found. Please log out and log in again.');
			return;
		}

		try {
			const updateData = {
				fullName: editForm.fullName,
				email: editForm.email,
				username: editForm.username,
			};
			if (editForm.password) {
				updateData.password = editForm.password;
			}

			console.log('Updating user:', user.id, updateData);
			const updatedUser = await api.updateUser(user.id, updateData);
			console.log('Update response:', updatedUser);
			
			localStorage.setItem('travel_user', JSON.stringify(updatedUser));
			setUser(updatedUser);
			setIsEditing(false);
			setUpdateSuccess(true);
			setTimeout(() => setUpdateSuccess(false), 3000);
		} catch (err) {
			console.error('Update error:', err);
			setUpdateError(err.message || 'Failed to update profile. Please try again.');
		}
	};

	if (!user) {
		return (
			<div className="min-h-screen px-4 pt-28 text-center dark:text-slate-200">
				<p className="mb-4">You are not logged in.</p>
				<Link to="/login" className="text-sky-600 underline dark:text-sky-400">
					Go to login
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{/* Header */}
					<div className="mb-8">
						<div className="flex items-center gap-4">
							<div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#003459] to-[#00a8e8] flex items-center justify-center shadow-lg">
								<span className="text-3xl">👤</span>
							</div>
							<div>
								<h1 className="text-4xl font-bold text-gray-900">
									Welcome back, {user.username}
								</h1>
								<p className="mt-1 text-gray-600">Manage your profile and explore destinations</p>
							</div>
						</div>
					</div>

					{updateSuccess && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 shadow-sm"
						>
							<p className="text-sm text-green-800 font-medium">✓ Profile updated successfully!</p>
						</motion.div>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Profile Card */}
							<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
								<div className="bg-gradient-to-r from-[#003459] to-[#00a8e8] h-2"></div>
								<div className="p-8">
									<div className="flex items-center justify-between mb-8">
										<div>
											<h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
											<p className="text-sm text-gray-500 mt-1">Update your personal details</p>
										</div>
										{!isEditing && (
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleEditClick}
												className="rounded-xl bg-gradient-to-r from-[#003459] to-[#00a8e8] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
											>
												Edit Profile
											</motion.button>
										)}
									</div>

									{isEditing ? (
										<form onSubmit={handleUpdate} className="space-y-6">
											{updateError && (
												<div className="rounded-xl bg-red-50 border border-red-200 p-4">
													<p className="text-sm text-red-800">{updateError}</p>
												</div>
											)}
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
														Full Name
													</label>
													<input
														id="fullName"
														type="text"
														value={editForm.fullName}
														onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
														className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00a8e8] focus:border-transparent transition-all"
													/>
												</div>
												<div>
													<label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
														Username
													</label>
													<input
														id="username"
														type="text"
														value={editForm.username}
														onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
														className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00a8e8] focus:border-transparent transition-all"
													/>
												</div>
											</div>
											<div>
												<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
													Email
												</label>
												<input
													id="email"
													type="email"
													value={editForm.email}
													onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
													className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00a8e8] focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
													New Password (optional)
												</label>
												<input
													id="password"
													type="password"
													value={editForm.password}
													onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
													placeholder="Leave blank to keep current password"
													className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00a8e8] focus:border-transparent transition-all"
												/>
											</div>
											<div className="flex gap-4">
												<motion.button
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													type="submit"
													className="flex-1 rounded-xl bg-gradient-to-r from-[#003459] to-[#00a8e8] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
												>
													Save Changes
												</motion.button>
												<motion.button
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													type="button"
													onClick={() => setIsEditing(false)}
													className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
												>
													Cancel
												</motion.button>
											</div>
										</form>
									) : (
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<motion.div
												whileHover={{ scale: 1.02 }}
												className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
											>
												<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</p>
												<p className="text-lg font-bold text-gray-900">{user.fullName || 'Not set'}</p>
											</motion.div>
											<motion.div
												whileHover={{ scale: 1.02 }}
												className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
											>
												<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Username</p>
												<p className="text-lg font-bold text-gray-900">{user.username}</p>
											</motion.div>
											<motion.div
												whileHover={{ scale: 1.02 }}
												className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
											>
												<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</p>
												<p className="text-lg font-bold text-gray-900">{user.email || 'Not set'}</p>
											</motion.div>
											<motion.div
												whileHover={{ scale: 1.02 }}
												className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
											>
												<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Role</p>
												<p className="text-lg font-bold text-gray-900">{user.role}</p>
											</motion.div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Admin Card */}
							{user.role === 'ADMIN' && (
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-200 p-6 overflow-hidden"
								>
									<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
									<div className="relative">
										<div className="flex items-center gap-4 mb-4">
											<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
												<span className="text-2xl">👑</span>
											</div>
											<div>
												<h3 className="font-bold text-gray-900 text-lg">Administrator</h3>
												<p className="text-sm text-gray-600">Full system access</p>
											</div>
										</div>
										<Link
											to="/admin"
											className="block w-full text-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
										>
											Open Admin Console
										</Link>
									</div>
								</motion.div>
							)}

							{/* Quick Links */}
							<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
								<h3 className="font-bold text-gray-900 text-lg mb-4">Quick Links</h3>
								<div className="space-y-3">
									<motion.div whileHover={{ x: 4 }}>
										<Link to="/places" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
											<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#003459] to-[#00a8e8] flex items-center justify-center text-white shadow-md">
												<span>🏝️</span>
											</div>
											<span className="text-sm font-medium text-gray-700 group-hover:text-[#00a8e8] transition-colors">Browse Places</span>
										</Link>
									</motion.div>
									<motion.div whileHover={{ x: 4 }}>
										<Link to="/hotels" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
											<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#003459] to-[#00a8e8] flex items-center justify-center text-white shadow-md">
												<span>🏨</span>
											</div>
											<span className="text-sm font-medium text-gray-700 group-hover:text-[#00a8e8] transition-colors">Browse Hotels</span>
										</Link>
									</motion.div>
									<motion.div whileHover={{ x: 4 }}>
										<Link to="/vehicles" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
											<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#003459] to-[#00a8e8] flex items-center justify-center text-white shadow-md">
												<span>🚗</span>
											</div>
											<span className="text-sm font-medium text-gray-700 group-hover:text-[#00a8e8] transition-colors">Browse Vehicles</span>
										</Link>
									</motion.div>
								</div>
							</div>

							{/* Logout */}
							<motion.div whileHover={{ scale: 1.02 }}>
								<button
									type="button"
									onClick={() => {
										localStorage.removeItem('travel_user');
										setUser(null);
										navigate('/');
									}}
									className="w-full rounded-xl border-2 border-red-200 px-6 py-4 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
								>
									Log out
								</button>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
