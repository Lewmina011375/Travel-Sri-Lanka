import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const errors = {};
		
		if (!fullName.trim()) {
			errors.fullName = 'Full name is required';
		} else if (fullName.length < 2) {
			errors.fullName = 'Full name must be at least 2 characters';
		}
		
		if (!username.trim()) {
			errors.username = 'Username is required';
		} else if (username.length < 3) {
			errors.username = 'Username must be at least 3 characters';
		}
		
		if (!email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
		}
		
		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}
		
		if (!confirmPassword) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (password !== confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
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
			await api.createUser({ username, email, password, fullName });
			navigate('/login');
		} catch (err) {
			setError('Could not register. Is the API running? Try unique username/email.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Left side - Form */}
			<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md"
				>
					<div className="bg-white rounded-xl shadow-lg p-8">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
							<p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
						</div>

						{error && (
							<div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-sm text-red-800">{error}</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
									Full Name
								</label>
								<input
									id="fullName"
									type="text"
									value={fullName}
									onChange={(e) => {
										setFullName(e.target.value);
										if (validationErrors.fullName) {
											setValidationErrors({ ...validationErrors, fullName: '' });
										}
									}}
									className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
										validationErrors.fullName
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300 focus:ring-[#00a8e8] focus:border-[#00a8e8]'
									}`}
									placeholder="Enter your full name"
								/>
								{validationErrors.fullName && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
								)}
							</div>

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
									placeholder="Choose a username"
								/>
								{validationErrors.username && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (validationErrors.email) {
											setValidationErrors({ ...validationErrors, email: '' });
										}
									}}
									className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
										validationErrors.email
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300 focus:ring-[#00a8e8] focus:border-[#00a8e8]'
									}`}
									placeholder="Enter your email"
								/>
								{validationErrors.email && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
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
									placeholder="Create a password"
								/>
								{validationErrors.password && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
								)}
							</div>

							<div>
								<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										if (validationErrors.confirmPassword) {
											setValidationErrors({ ...validationErrors, confirmPassword: '' });
										}
									}}
									className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
										validationErrors.confirmPassword
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300 focus:ring-[#00a8e8] focus:border-[#00a8e8]'
									}`}
									placeholder="Confirm your password"
								/>
								{validationErrors.confirmPassword && (
									<p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00a8e8] hover:bg-[#007ea7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a8e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? 'Creating account...' : 'Create account'}
							</button>

							<div className="text-center">
								<p className="text-sm text-gray-600">
									Already have an account?{' '}
									<Link to="/login" className="font-medium text-[#00a8e8] hover:text-[#007ea7]">
										Sign in
									</Link>
								</p>
							</div>
						</form>
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
					<h2 className="text-4xl font-bold text-white mb-4">Explore the World</h2>
					<p className="text-lg text-white/90 mb-8">Discover amazing destinations, create unforgettable memories, and embark on your next adventure with us.</p>
					<img
						src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop"
						alt="Travel destination"
						className="rounded-2xl shadow-2xl w-full h-80 object-cover"
					/>
				</motion.div>
			</div>
		</div>
	);
}
