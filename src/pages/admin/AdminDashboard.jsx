import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { AdminPanel, AdminCard } from '../../components/admin/AdminUi';

function StatCard({ title, value, hint, icon: Icon, accent }) {
	const accents = {
		sky: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400',
		emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
		violet: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400',
		amber: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
		rose: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
		slate: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
	};
	const bar = {
		sky: 'bg-sky-500',
		emerald: 'bg-emerald-500',
		violet: 'bg-violet-500',
		amber: 'bg-amber-500',
		rose: 'bg-rose-500',
		slate: 'bg-slate-500',
	};
	const a = accents[accent] || accents.slate;
	const b = bar[accent] || bar.slate;
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90"
		>
			<div className={`absolute left-0 top-0 h-full w-1 ${b}`} />
			<div className="p-5 pl-6">
				<div className="flex items-start justify-between gap-3">
					<div>
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
							{title}
						</p>
						<p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">
							{value}
						</p>
						{hint && (
							<p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
						)}
					</div>
					<div
						className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a}`}
					>
						<Icon />
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function IconUsers() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 01 5.25 0z" />
		</svg>
	);
}
function IconBook() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
		</svg>
	);
}
function IconCurrency() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	);
}
function IconMap() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
		</svg>
	);
}
function IconBuilding() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3a3 3 0 013-3h3a3 3 0 013 3v3M3 3h12M3 3h3v3H3V3z" />
		</svg>
	);
}
function IconTruck() {
	return (
		<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.25 2.25 0 00-1.227-1.227A17.903 17.903 0 003.5 14.25v2.25m18-4.125V9.75m0 4.125v2.25m0 0h-4.125M21 14.25v2.25a2.25 2.25 0 01-2.25 2.25h-2.25" />
		</svg>
	);
}

function PopularList({ title, items, empty }) {
	return (
		<AdminCard title={title}>
			<ul className="space-y-3">
				{items?.length ? (
					items.map((row, i) => {
						const max = Math.max(1, ...items.map((x) => x.count || 0));
						const pct = Math.round(((row.count || 0) / max) * 100);
						return (
							<li key={`${row.id}-${i}`}>
								<div className="flex items-center justify-between gap-2 text-sm">
									<span className="truncate font-medium text-slate-800 dark:text-slate-200">
										{row.name}
									</span>
									<span className="shrink-0 tabular-nums text-xs font-semibold text-sky-600 dark:text-sky-400">
										{row.count}
									</span>
								</div>
								<div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
									<div
										className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400"
										style={{ width: `${pct}%` }}
									/>
								</div>
							</li>
						);
					})
				) : (
					<li className="text-sm text-slate-400">{empty}</li>
				)}
			</ul>
		</AdminCard>
	);
}

function DashboardSkeleton() {
	return (
		<div className="space-y-8 animate-pulse">
			<div className="h-24 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div key={i} className="h-28 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
				))}
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				<div className="h-40 rounded-2xl bg-slate-200/80 dark:bg-slate-800 md:col-span-1" />
				<div className="h-40 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
				<div className="h-40 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
			</div>
		</div>
	);
}

export default function AdminDashboard() {
	const [stats, setStats] = useState(null);
	const [err, setErr] = useState('');

	useEffect(() => {
		let c = false;
		(async () => {
			try {
				const data = await api.adminStats();
				if (!c) setStats(data);
			} catch {
				if (!c) setErr('Could not load stats. Is the API running?');
			}
		})();
		return () => {
			c = true;
		};
	}, []);

	if (err) {
		return (
			<AdminCard title="Connection issue">
				<p className="text-sm text-rose-600 dark:text-rose-400">{err}</p>
				<p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
					Start the Spring Boot app and ensure CORS allows this origin.
				</p>
			</AdminCard>
		);
	}
	if (!stats) {
		return <DashboardSkeleton />;
	}

	const rev =
		typeof stats.totalRevenue === 'number'
			? stats.totalRevenue.toFixed(2)
			: String(stats.totalRevenue ?? '0');

	const today = new Intl.DateTimeFormat(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date());

	return (
		<AdminPanel
			subtitle={`${today} · High-level metrics and moderation queue.`}
			actions={
				<>
					<Link
						to="/admin/users"
						className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-900/20 transition hover:bg-sky-500"
					>
						Manage users
					</Link>
					<Link
						to="/admin/bookings"
						className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
					>
						View bookings
					</Link>
				</>
			}
		>
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/50 md:p-8"
			>
				<p className="text-sm font-medium text-sky-600 dark:text-sky-400">Welcome back</p>
				<h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
					Here is how your platform is performing
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
					Track inventory, revenue, and tasks that need attention. Numbers refresh when you reload
					this page.
				</p>
			</motion.div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Total users"
					value={stats.totalUsers}
					icon={IconUsers}
					accent="sky"
				/>
				<StatCard
					title="Bookings"
					value={stats.totalBookings}
					icon={IconBook}
					accent="emerald"
				/>
				<StatCard
					title="Revenue (sum)"
					value={`$${rev}`}
					hint="Sum of booking totals"
					icon={IconCurrency}
					accent="violet"
				/>
				<StatCard title="Places" value={stats.totalPlaces} icon={IconMap} accent="amber" />
				<StatCard title="Hotels" value={stats.totalHotels} icon={IconBuilding} accent="rose" />
				<StatCard title="Vehicles" value={stats.totalVehicles} icon={IconTruck} accent="slate" />
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm dark:border-amber-900/40 dark:from-amber-950/40 dark:to-slate-900/80"
				>
					<p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Action queue</p>
					<p className="mt-3 text-sm text-amber-900/90 dark:text-amber-200/90">
						<span className="font-bold tabular-nums">{stats.pendingReviews}</span> reviews need
						moderation
					</p>
					<p className="mt-1 text-sm text-amber-900/90 dark:text-amber-200/90">
						<span className="font-bold tabular-nums">{stats.pendingHotels}</span> hotels await
						approval
					</p>
					<div className="mt-5 flex flex-wrap gap-2">
						<Link
							to="/admin/reviews"
							className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-500"
						>
							Moderate reviews
						</Link>
						<Link
							to="/admin/hotels"
							className="rounded-xl border border-amber-300/80 bg-white/80 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-white dark:border-amber-800 dark:bg-slate-900 dark:text-amber-200"
						>
							Review hotels
						</Link>
					</div>
				</motion.div>
				<PopularList
					title="Popular places"
					items={stats.popularPlaces}
					empty="No review data yet."
				/>
				<PopularList
					title="Popular hotels"
					items={stats.popularHotels}
					empty="No bookings yet."
				/>
			</div>

			<PopularList
				title="Popular vehicles"
				items={stats.popularVehicles}
				empty="No vehicle bookings yet."
			/>
		</AdminPanel>
	);
}
