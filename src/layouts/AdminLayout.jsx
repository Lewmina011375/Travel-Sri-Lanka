import { useEffect, useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
	{
		label: 'Overview',
		items: [{ to: '/admin', label: 'Dashboard', end: true, icon: IconChart }],
	},
	{
		label: 'Catalog',
		items: [
			{ to: '/admin/places', label: 'Places', end: false, icon: IconMap },
			{ to: '/admin/hotels', label: 'Hotels', end: false, icon: IconBuilding },
			{ to: '/admin/vehicles', label: 'Vehicles', end: false, icon: IconTruck },
		],
	},
	{
		label: 'Operations',
		items: [
			{ to: '/admin/bookings', label: 'Bookings', end: false, icon: IconCalendar },
			{ to: '/admin/reviews', label: 'Reviews', end: false, icon: IconMessage },
		],
	},
	{
		label: 'System',
		items: [{ to: '/admin/users', label: 'Users & roles', end: false, icon: IconUsers }],
	},
];

function IconChart() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
		</svg>
	);
}
function IconMap() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
		</svg>
	);
}
function IconBuilding() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3a3 3 0 013-3h3a3 3 0 013 3v3M3 3h12M3 3h3v3H3V3z" />
		</svg>
	);
}
function IconTruck() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.25 2.25 0 00-1.227-1.227A17.903 17.903 0 003.5 14.25v2.25m18-4.125V9.75m0 4.125v2.25m0 0h-4.125M21 14.25v2.25a2.25 2.25 0 01-2.25 2.25h-2.25" />
		</svg>
	);
}
function IconCalendar() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 016.75 9h10.5a2.25 2.25 0 012.25 2.25v7.5" />
		</svg>
	);
}
function IconMessage() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
		</svg>
	);
}
function IconUsers() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 01 5.25 0z" />
		</svg>
	);
}

const TITLE_MAP = {
	'/admin': 'Dashboard',
	'/admin/users': 'Users & roles',
	'/admin/places': 'Places',
	'/admin/hotels': 'Hotels',
	'/admin/vehicles': 'Vehicles',
	'/admin/bookings': 'Bookings',
	'/admin/reviews': 'Reviews',
};

function readUser() {
	try {
		const r = localStorage.getItem('travel_user');
		return r ? JSON.parse(r) : null;
	} catch {
		return null;
	}
}

function SidebarNav({ onNavigate, linkCls }) {
	return (
		<nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
			{SECTIONS.map((section) => (
				<div key={section.label}>
					<p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
						{section.label}
					</p>
					<ul className="space-y-0.5">
						{section.items.map((item) => (
							<li key={item.to}>
								<NavLink
									to={item.to}
									end={item.end}
									onClick={onNavigate}
									className={linkCls}
								>
									{({ isActive }) => (
										<>
											<span
												className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
													isActive
														? 'bg-sky-500 text-white shadow-md shadow-sky-900/30'
														: 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200'
												}`}
											>
												<item.icon />
											</span>
											<span className="truncate">{item.label}</span>
											{isActive && (
												<span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
											)}
										</>
									)}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
}

export default function AdminLayout() {
	const [user, setUser] = useState(readUser);
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const loc = useLocation();

	useEffect(() => {
		setUser(readUser());
	}, [loc.pathname]);

	if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
	if (user.role !== 'ADMIN') return <Navigate to="/" replace />;

	const pageTitle = TITLE_MAP[loc.pathname] || 'Admin';

	const linkCls = ({ isActive }) =>
		`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
			isActive
				? 'bg-slate-800 text-white shadow-inner shadow-black/20'
				: 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
		}`;

	return (
		<div className="admin-app flex min-h-screen bg-[#f4f6f9] antialiased dark:bg-[#0c0f14]">
			{menuOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
					aria-label="Close menu"
					onClick={() => setMenuOpen(false)}
				/>
			)}

			<button
				type="button"
				className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-900/40 md:hidden"
				onClick={() => setMenuOpen((o) => !o)}
				aria-label="Menu"
			>
				<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>

			<aside className="relative hidden w-[280px] shrink-0 flex-col border-r border-slate-800/80 bg-[#0f1419] text-slate-300 shadow-2xl shadow-black/20 md:flex">
				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,165,233,0.06)_0%,transparent_45%)] pointer-events-none" />
				<div className="relative border-b border-slate-800/80 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-lg font-bold text-white shadow-lg shadow-sky-900/50">
							T
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-sky-400/90">TravelLanka</p>
							<p className="text-base font-bold text-white">Control center</p>
						</div>
					</div>
				</div>
				<SidebarNav linkCls={linkCls} />
				<div className="relative mt-auto border-t border-slate-800/80 p-4">
					<div className="rounded-xl bg-slate-800/50 p-3">
						<p className="truncate text-xs font-medium text-white">{user.username}</p>
						<p className="text-[10px] uppercase tracking-wide text-sky-400/80">Administrator</p>
						<button
							type="button"
							onClick={() => navigate('/')}
							className="mt-3 w-full rounded-lg bg-slate-700/80 py-2 text-xs font-medium text-white transition hover:bg-slate-600"
						>
							View public site
						</button>
					</div>
				</div>
			</aside>

			<AnimatePresence>
				{menuOpen && (
					<motion.aside
						initial={{ x: -300, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -300, opacity: 0 }}
						transition={{ type: 'spring', damping: 28, stiffness: 320 }}
						className="fixed inset-y-0 left-0 z-50 flex min-h-0 w-[min(300px,92vw)] flex-col border-r border-slate-800 bg-[#0f1419] shadow-2xl md:hidden"
					>
						<div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-4">
							<span className="font-bold text-white">Menu</span>
							<button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800" onClick={() => setMenuOpen(false)}>
								✕
							</button>
						</div>
						<div className="flex min-h-0 flex-1 flex-col">
							<SidebarNav onNavigate={() => setMenuOpen(false)} linkCls={linkCls} />
						</div>
					</motion.aside>
				)}
			</AnimatePresence>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/75 px-4 py-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0c0f14]/75 md:px-10">
					<div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
								Admin
							</p>
							<h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
								{pageTitle}
							</h1>
						</div>
						<div className="flex items-center gap-3">
							<span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 sm:inline dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-300">
								Live system
							</span>
							<div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" />
						</div>
					</div>
				</header>
				<main className="relative flex-1">
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.4) 1px, transparent 0)`,
							backgroundSize: '24px 24px',
						}}
					/>
					<div className="relative mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-10">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
