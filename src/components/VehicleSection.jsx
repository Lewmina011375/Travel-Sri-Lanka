import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api, resolveMediaUrl } from '../api/client';

const FALLBACK = [
	{ id: 'v1', type: 'Car', model: 'Sedan', pricePerDay: 45, available: true },
	{ id: 'v2', type: 'Van', model: '8-seater', pricePerDay: 72, available: true },
	{ id: 'v3', type: 'Bus', model: '22-seater', pricePerDay: 140, available: true },
];

export default function VehicleSection() {
	const [vehicles, setVehicles] = useState([]);

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

	return (
		<section id="vehicles" className="scroll-mt-24 bg-gradient-to-b from-[#F5E6D3]/30 to-white py-24 dark:from-slate-800/50 dark:to-slate-900">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538]/10 to-[#C75B39]/10 px-6 py-2 border border-[#8B1538]/20 dark:border-[#FFD700]/20"
					>
						<span className="text-2xl">🚗</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Travel Comfortably
						</span>
					</motion.div>
					
					<h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						Vehicle
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Rental Options
						</span>
					</h2>
					<p className="mb-12 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
						From compact cars for solo travelers to spacious buses for groups — explore Sri Lanka at your own pace with our reliable transport options.
					</p>
				</motion.div>
				
				<div className="grid gap-8 md:grid-cols-3">
					{vehicles.map((v, i) => (
						<motion.div
							key={v.id ?? `${v.type}-${i}`}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
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
									<h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#FFD700] transition-colors">
										{v.type}
									</h3>
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
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="mt-16 text-center"
				>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link
							to="/vehicles"
							className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B1538]/30 px-8 py-4 text-sm font-semibold text-[#8B1538] transition-all hover:bg-[#8B1538] hover:text-white dark:border-[#FFD700]/30 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
						>
							View All Vehicles
							<span>→</span>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
