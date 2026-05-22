import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, mergePlaces } from '../api/client';

export default function PlaceDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [place, setPlace] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const data = await api.places();
				if (!cancelled) {
					const allPlaces = mergePlaces(data);
					const decodedId = decodeURIComponent(id);
					
					// Try to find by ID or name first
					let found = allPlaces.find(p => 
						p.id === id || 
						p.id === decodedId ||
						p.name === id || 
						p.name === decodedId ||
						p.name?.toLowerCase() === decodedId.toLowerCase() ||
						p.name?.toLowerCase() === id.toLowerCase()
					);
					
					// If not found and ID is numeric, try to get by index
					if (!found && !isNaN(id)) {
						const index = parseInt(id) - 1;
						if (index >= 0 && index < allPlaces.length) {
							found = allPlaces[index];
						}
					}
					
					setPlace(found || null);
				}
			} catch {
				if (!cancelled) setPlace(null);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => { cancelled = true; };
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5E6D3]/30 to-white dark:from-slate-800/50 dark:to-slate-900">
				<div className="text-center">
					<div className="mb-4 text-4xl animate-spin">🌴</div>
					<p className="text-slate-600 dark:text-slate-400">Loading...</p>
				</div>
			</div>
		);
	}

	if (!place) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5E6D3]/30 to-white dark:from-slate-800/50 dark:to-slate-900">
				<div className="text-center">
					<p className="mb-6 text-2xl">😕</p>
					<p className="mb-4 text-lg text-slate-600 dark:text-slate-400">Place not found</p>
					<Link
						to="/places"
						className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
					>
						← Back to Places
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#F5E6D3]/30 to-white dark:from-slate-800/50 dark:to-slate-900 pb-24 pt-28">
			<div className="mx-auto max-w-5xl px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Link
						to="/places"
						className="inline-flex items-center gap-2 text-sm font-medium text-[#8B1538] hover:text-[#C75B39] dark:text-[#FFD700] dark:hover:text-[#FF6B35] transition-colors mb-6"
					>
						← Back to Places
					</Link>

					<div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl mb-8">
						<img
							src={
								place.imageUrl ||
								'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80'
							}
							alt={place.name}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						<div className="absolute bottom-6 left-6 right-6">
							<div className="flex items-center gap-2 mb-3">
								<span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
									📍 {place.city}, {place.country}
								</span>
							</div>
							<h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
								{place.name}
							</h1>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						<div className="md:col-span-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className="rounded-3xl border border-slate-200/50 bg-white p-8 shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
							>
								<h2 className="mb-4 font-serif text-2xl font-bold text-slate-900 dark:text-white">
									About This Destination
								</h2>
								<p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
									{place.description || 'No description available for this destination.'}
								</p>
							</motion.div>
						</div>

						<div className="space-y-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.5 }}
								className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
							>
								<h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Location</h3>
								<div className="space-y-2">
									<p className="text-slate-600 dark:text-slate-400">
										<span className="font-medium">City:</span> {place.city}
									</p>
									<p className="text-slate-600 dark:text-slate-400">
										<span className="font-medium">Country:</span> {place.country}
									</p>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
							>
								<h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
								<div className="space-y-3">
									<Link
										to="/hotels"
										className="block w-full rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
									>
										Find Hotels Nearby
									</Link>
									<Link
										to="/vehicles"
										className="block w-full rounded-full border-2 border-[#8B1538]/30 px-4 py-3 text-center text-sm font-semibold text-[#8B1538] transition-all hover:bg-[#8B1538] hover:text-white dark:border-[#FFD700]/30 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
									>
										Rent a Vehicle
									</Link>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
