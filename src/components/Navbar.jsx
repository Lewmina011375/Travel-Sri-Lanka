import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';

const linkClass = ({ isActive }) =>
	`relative transition-all duration-300 ${isActive ? 'text-[#8B1538] dark:text-[#FFD700] font-semibold' : 'text-slate-700 dark:text-slate-300 hover:text-[#8B1538] dark:hover:text-[#FFD700]'}`;

function readUser() {
	try {
		const r = localStorage.getItem('travel_user');
		return r ? JSON.parse(r) : null;
	} catch {
		return null;
	}
}

export default function Navbar() {
	const { dark, toggle } = useTheme();
	const { query, setQuery } = useSearch();
	const navigate = useNavigate();
	const loc = useLocation();
	const [sessionUser, setSessionUser] = useState(readUser);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		setSessionUser(readUser());
	}, [loc.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.nav
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className={`fixed top-0 z-50 w-full transition-all duration-300 ${
				scrolled
					? 'glass-dark shadow-2xl'
					: 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md'
			}`}
		>
			<div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 md:px-6">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8B1538] to-[#C75B39] shadow-lg">
						<span className="text-lg font-bold text-white">🇱🇰</span>
					</div>
					<span className="font-serif text-lg font-bold bg-gradient-to-r from-[#8B1538] to-[#C75B39] bg-clip-text text-transparent dark:from-[#FFD700] dark:to-[#FF6B35]">
						TravelLanka
					</span>
				</Link>

				<label className="relative order-last w-full md:order-none md:mx-4 md:max-w-xs md:flex-1">
					<span className="sr-only">Search</span>
					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								const q = query.trim();
								navigate(q ? `/places?q=${encodeURIComponent(q)}` : '/places');
							}
						}}
						placeholder="Search destinations..."
						className="w-full rounded-full border border-slate-200/50 bg-white/50 py-1.5 pl-8 pr-10 text-xs text-slate-800 outline-none ring-[#8B1538]/30 focus:ring-2 dark:border-slate-600/50 dark:bg-slate-800/50 dark:text-slate-100 dark:ring-[#FFD700]/30 backdrop-blur-sm transition-all"
					/>
					<span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden>
						🔍
					</span>
					<button
						type="button"
						onClick={() => {
							const q = query.trim();
							navigate(q ? `/places?q=${encodeURIComponent(q)}` : '/places');
						}}
						className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] p-1 text-white shadow-lg hover:shadow-xl transition-all dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
						aria-label="Search"
					>
						🔍
					</button>
				</label>

				<ul className="flex flex-wrap items-center gap-4 text-xs font-medium">
					<li>
						<NavLink to="/" end className={linkClass}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/places" className={linkClass}>
							Places
						</NavLink>
					</li>
					<li>
						<NavLink to="/hotels" className={linkClass}>
							Hotels
						</NavLink>
					</li>
					<li>
						<NavLink to="/vehicles" className={linkClass}>
							Vehicles
						</NavLink>
					</li>
					{sessionUser?.role === 'ADMIN' && (
						<>
							<li>
								<NavLink to="/dashboard" className={linkClass}>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink to="/admin" className={linkClass}>
									Admin
								</NavLink>
							</li>
						</>
					)}
					{sessionUser ? (
						<li className="flex items-center gap-2">
							<Link to="/dashboard" className="hidden sm:flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer">
								<div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#8B1538] to-[#C75B39] flex items-center justify-center text-white text-[10px] font-bold dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900">
									{sessionUser.username.charAt(0).toUpperCase()}
								</div>
								<span className="text-[10px] text-slate-600 dark:text-slate-400">
									{sessionUser.username}
								</span>
							</Link>
							<button
								type="button"
								onClick={() => {
									localStorage.removeItem('travel_user');
									setSessionUser(null);
									navigate('/');
								}}
								className="rounded-full border border-[#8B1538]/30 px-3 py-1 text-[10px] font-medium text-[#8B1538] hover:bg-[#8B1538] hover:text-white transition-all dark:border-[#FFD700]/30 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
							>
								Log out
							</button>
						</li>
					) : (
						<>
							<li>
								<NavLink to="/login" className={linkClass}>
									Login
								</NavLink>
							</li>
							<li>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<NavLink
										to="/register"
										className="rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-3 py-1 text-[10px] font-semibold text-white shadow-lg hover:shadow-xl transition-all dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
									>
										Register
									</NavLink>
								</motion.div>
							</li>
						</>
					)}
					<li>
						<button
							type="button"
							onClick={toggle}
							className="rounded-full border border-slate-200/50 p-1 text-xs transition-all hover:bg-slate-100 dark:border-slate-600/50 dark:hover:bg-slate-800"
							aria-label="Toggle dark mode"
						>
							{dark ? '☀️' : '🌙'}
						</button>
					</li>
				</ul>
			</div>
		</motion.nav>
	);
}
