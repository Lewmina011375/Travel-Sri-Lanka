import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { api, mergePlaces } from '../api/client';
import { useSearch } from '../context/SearchContext';

export default function Places() {
	const [places, setPlaces] = useState([]);
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
				const data = await api.places();
				if (!c) setPlaces(mergePlaces(data));
			} catch {
				if (!c) setPlaces(mergePlaces([]));
			}
		})();
		return () => {
			c = true;
		};
	}, []);

	const q = query.trim().toLowerCase();
	const list = q
		? places.filter((p) =>
				`${p.name} ${p.city} ${p.description || ''}`.toLowerCase().includes(q)
			)
		: places;

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
						<span className="text-2xl">🌴</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Explore Paradise
						</span>
					</motion.div>
					
					<h1 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						All
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Destinations
						</span>
					</h1>
					<p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
						Discover breathtaking locations across Sri Lanka — from ancient fortresses to pristine beaches.
					</p>
				</motion.div>
				
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{list.map((p, i) => (
						<motion.article
							key={p.id ?? p.name}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							whileHover={{ y: -8 }}
							className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
						>
							<div className="relative aspect-[4/3] overflow-hidden">
								<img
									src={
										p.imageUrl ||
										'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80'
									}
									alt=""
									className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center gap-2">
										<span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
											📍 {p.city}
										</span>
									</div>
								</div>
							</div>
							<div className="p-6">
								<h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#FFD700] transition-colors">
									{p.name}
								</h2>
								<p className="mb-3 text-sm text-[#8B1538] dark:text-[#FFD700] font-medium">
									{p.country}
								</p>
								<p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
									{p.description}
								</p>
								<Link
									to={`/places/${p.id || p.name}`}
									className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
								>
									View Details
									<motion.span
										className="transition-transform group-hover/btn:translate-x-1"
									>
										→
									</motion.span>
								</Link>
							</div>
						</motion.article>
					))}
				</div>
				
				{list.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="mt-16 text-center"
					>
						<div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-slate-200/50 bg-white p-8 shadow-lg dark:border-slate-700/50 dark:bg-slate-800/50">
							<span className="text-6xl">🔍</span>
							<p className="text-lg text-slate-600 dark:text-slate-400">
								No places match your search.
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
