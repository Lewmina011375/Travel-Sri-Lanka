import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useSearch } from '../context/SearchContext';

function hotelImg(h) {
	return (
		h.imageUrl ||
		'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
	);
}

export default function HotelSection() {
	const [hotels, setHotels] = useState([]);
	const { query } = useSearch();

	useEffect(() => {
		let c = false;
		(async () => {
			try {
				const data = await api.hotels();
				if (!c) setHotels(Array.isArray(data) ? data : []);
			} catch {
				if (!c)
					setHotels([
						{
							id: 'demo1',
							name: 'The Grand Highland',
							pricePerNight: 120,
							description: 'Tea-country views and fireplace lounge',
							place: { city: 'Nuwara Eliya' },
						},
						{
							id: 'demo2',
							name: 'Rock View Lodge',
							pricePerNight: 89,
							description: 'Minutes from Sigiriya rock',
							place: { city: 'Sigiriya' },
						},
						{
							id: 'demo3',
							name: 'Ella Eco Stay',
							pricePerNight: 65,
							description: 'Deck overlooking Ella Gap',
							place: { city: 'Ella' },
						},
					]);
			}
		})();
		return () => {
			c = true;
		};
	}, []);

	const q = query.trim().toLowerCase();
	const approvedFirst = hotels.filter((h) => h.approved !== false);
	const list = q
		? approvedFirst.filter((h) => {
				const s = `${h.name} ${h.address || ''} ${h.place?.city || ''} ${h.description || ''}`.toLowerCase();
				return s.includes(q);
			})
		: approvedFirst;

	return (
		<section id="hotels" className="scroll-mt-24 bg-gradient-to-b from-white to-[#F5E6D3]/30 py-24 dark:from-slate-900 dark:to-slate-800/50">
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
						<span className="text-2xl">🏨</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Luxury Stays
						</span>
					</motion.div>
					
					<h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						Premium
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Accommodations
						</span>
					</h2>
					<p className="mb-12 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
						From boutique hotels in tea country to beachfront resorts — experience authentic Sri Lankan hospitality in style.
					</p>
				</motion.div>
				
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{list.slice(0, 6).map((h, i) => (
						<motion.article
							key={h.id ?? h.name}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							whileHover={{ y: -8 }}
							className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
						>
							<div className="relative aspect-[16/10] overflow-hidden">
								<img
									src={hotelImg(h)}
									alt=""
									className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								<div className="absolute top-4 right-4">
									<span className="flex items-center gap-1 rounded-full bg-[#FFD700] px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
										<span>⭐</span>
										<span>{(4 + (i % 2) * 0.3).toFixed(1)}</span>
									</span>
								</div>
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center gap-2">
										<span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
											📍 {h.place?.city || 'Sri Lanka'}
										</span>
									</div>
								</div>
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#FFD700] transition-colors">
									{h.name}
								</h3>
								<div className="mb-3 flex items-center justify-between">
									<p className="text-2xl font-bold text-[#8B1538] dark:text-[#FFD700]">
										${Number(h.pricePerNight ?? 0).toFixed(0)}
										<span className="text-sm font-normal text-slate-600 dark:text-slate-400">/night</span>
									</p>
								</div>
								<p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
									{h.description}
								</p>
								<Link
									to={`/hotels?q=${encodeURIComponent(h.name)}`}
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
						</motion.article>
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
							to="/hotels"
							className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B1538]/30 px-8 py-4 text-sm font-semibold text-[#8B1538] transition-all hover:bg-[#8B1538] hover:text-white dark:border-[#FFD700]/30 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
						>
							View All Hotels
							<span>→</span>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
