import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const errors = {};
		if (!username.trim()) {
			errors.username = 'Username is required';
		} else if (username.length < 3) {
			errors.username = 'Username must be at least 3 characters';
		}
		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			const data = await api.login(username, password);
			localStorage.setItem('travel_user', JSON.stringify(data.user));
			navigate('/dashboard');
		} catch (e) {
			setError(
				e?.message?.includes('Cannot reach API')
					? e.message
					: 'Invalid username or password. If you use the default admin, restart the backend once so it can sync app.admin.password to the database (see application.properties).'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Left side - Form */}
			<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md"
				>
					<div className="bg-white rounded-xl shadow-lg p-8">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
							<p className="mt-2 text-sm text-gray-600">Welcome back to your account</p>
						</div>

						{error && (
							<div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-sm text-red-800">{error}</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<input
									id="username"
									type="text"
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
										if (validationErrors.username) {
											setValidationErrors({ ...validationErrors, username: '' });
										}
									}}
									className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
										validationErrors.username
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300 focus:ring-[#00a8e8] focus:border-[#00a8e8]'
									}`}
									placeholder="Enter your username"
								/>
								{validationErrors.username && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
								)}
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<input
									id="password"
									type="password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										if (validationErrors.password) {
											setValidationErrors({ ...validationErrors, password: '' });
										}
									}}
									className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
										validationErrors.password
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300 focus:ring-[#00a8e8] focus:border-[#00a8e8]'
									}`}
									placeholder="Enter your password"
								/>
								{validationErrors.password && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00a8e8] hover:bg-[#007ea7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a8e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? 'Signing in...' : 'Sign in'}
							</button>

							<div className="text-center">
								<p className="text-sm text-gray-600">
									Don't have an account?{' '}
									<Link to="/register" className="font-medium text-[#00a8e8] hover:text-[#007ea7]">
										Register
									</Link>
								</p>
							</div>
						</form>

						<div className="mt-6 pt-6 border-t border-gray-200">
							<p className="text-xs text-gray-500 mb-2">Default administrator credentials:</p>
							<p className="text-sm text-gray-700">
								<span className="font-medium">Username:</span> admin &nbsp;|&nbsp; <span className="font-medium">Password:</span> admin123
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Right side - Image */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#003459] to-[#007ea7] items-center justify-center p-12">
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="max-w-lg w-full"
				>
					<h2 className="text-4xl font-bold text-white mb-4">Discover Sri Lanka</h2>
					<p className="text-lg text-white/90 mb-8">Experience the beauty of tropical paradise, ancient temples, and pristine beaches.</p>
					<img
						src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
						alt="Sri Lanka beach"
						className="rounded-2xl shadow-2xl w-full h-80 object-cover"
					/>
				</motion.div>
			</div>
		</div>
	);
}
