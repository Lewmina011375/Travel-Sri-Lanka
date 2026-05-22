import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { api, resolveMediaUrl } from '../api/client';
import { useSearch } from '../context/SearchContext';

const FALLBACK = [
	{ id: 'v1', type: 'Car', model: 'Sedan', pricePerDay: 45, available: true },
	{ id: 'v2', type: 'Van', model: '8-seater', pricePerDay: 72, available: true },
	{ id: 'v3', type: 'Bus', model: '22-seater', pricePerDay: 140, available: true },
];

export default function Vehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [searchParams] = useSearchParams();
	const { query, setQuery } = useSearch();

	useEffect(() => {
		const q = searchParams.get('q');
		if (q != null && q !== '') setQuery(q);
	}, [searchParams, setQuery]);

	useEffect(() => {
		let c = false;
		(async () => {
			try {
				const data = await api.vehicles();
				if (!c) setVehicles(Array.isArray(data) && data.length ? data : FALLBACK);
			} catch {
				if (!c) setVehicles(FALLBACK);
			}
		})();
		return () => {
			c = true;
		};
	}, []);

	const q = query.trim().toLowerCase();
	const list = q
		? vehicles.filter((v) =>
				`${v.type} ${v.model} ${v.plateNumber || ''}`.toLowerCase().includes(q)
			)
		: vehicles;

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#F5E6D3]/30 to-white pb-24 pt-28 dark:from-slate-800/50 dark:to-slate-900">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538]/10 to-[#C75B39]/10 px-6 py-2 border border-[#8B1538]/20 dark:border-[#FFD700]/20"
					>
						<span className="text-2xl">🚗</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Travel Comfortably
						</span>
					</motion.div>
					
					<h1 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						Vehicle
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Rental Options
						</span>
					</h1>
					<p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
						From compact cars for solo travelers to spacious buses for groups — explore Sri Lanka at your own pace with our reliable transport options.
					</p>
				</motion.div>
				
				<div className="grid gap-8 md:grid-cols-3">
					{list.map((v, i) => (
						<motion.div
							key={`${v.id}-${i}`}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							whileHover={{ y: -8 }}
							className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
						>
							{v.imageUrl ? (
								<div className="relative aspect-[16/9] overflow-hidden">
									<img
										src={resolveMediaUrl(v.imageUrl)}
										alt=""
										className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								</div>
							) : (
								<div className="relative aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-[#8B1538]/10 to-[#C75B39]/10 text-6xl dark:from-[#FFD700]/10 dark:to-[#FF6B35]/10">
									{v.type === 'Bus' ? '🚌' : v.type === 'Van' ? '🚐' : '🚗'}
								</div>
							)}
							<div className="p-6">
								<div className="mb-3 flex items-center justify-between">
									<h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#FFD700] transition-colors">
										{v.type}
									</h2>
									<span className={`rounded-full px-3 py-1 text-xs font-medium ${
										v.available 
											? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
											: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
									}`}>
										{v.available ? '✓ Available' : 'On Request'}
									</span>
								</div>
								<p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
									{v.model}
								</p>
								<div className="mb-4 flex items-baseline gap-1">
									<span className="text-2xl font-bold text-[#8B1538] dark:text-[#FFD700]">
										${Number(v.pricePerDay ?? 0).toFixed(0)}
									</span>
									<span className="text-sm text-slate-600 dark:text-slate-400">/day</span>
								</div>
								<Link
									to={`/vehicles?q=${encodeURIComponent(v.type || v.model || '')}`}
									className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
								>
									Book Now
									<motion.span
										className="transition-transform group-hover/btn:translate-x-1"
									>
										→
									</motion.span>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
				
				{list.length === 0 && vehicles.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="mt-16 text-center"
					>
						<div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-slate-200/50 bg-white p-8 shadow-lg dark:border-slate-700/50 dark:bg-slate-800/50">
							<span className="text-6xl">🔍</span>
							<p className="text-lg text-slate-600 dark:text-slate-400">
								No vehicles match your search.
							</p>
							<button
								type="button"
								onClick={() => setQuery('')}
								className="rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
							>
								Clear Filter
							</button>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
}
