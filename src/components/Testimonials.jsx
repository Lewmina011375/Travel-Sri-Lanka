import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

const STATIC = [
	{
		name: 'Amaya P.',
		text: 'Smooth booking flow and gorgeous place cards. Felt like a travel portfolio come alive.',
		rating: 5,
	},
	{
		name: 'Rohan D.',
		text: 'Loved the trip planner — budget + days gave us a realistic Sigiriya + Ella combo.',
		rating: 5,
	},
	{
		name: 'Sarah L.',
		text: 'Dark mode and hover animations are polished. Perfect demo for coursework.',
		rating: 4,
	},
];

export default function Testimonials() {
	const [items, setItems] = useState(STATIC);

	useEffect(() => {
		let c = false;
		(async () => {
			try {
				const reviews = await api.reviews();
				if (!c && Array.isArray(reviews) && reviews.length) {
					const visible = reviews.filter((r) => r.approved !== false);
					setItems(
						visible.slice(0, 6).map((r, i) => ({
							name: r.user?.fullName || r.user?.username || `Traveler ${i + 1}`,
							text: r.comment || 'Great experience.',
							rating: r.rating || 5,
						}))
					);
				}
			} catch {
				/* keep static */
			}
		})();
		return () => {
			c = true;
		};
	}, []);

	return (
		<section id="testimonials" className="scroll-mt-24 bg-gradient-to-b from-white to-[#F5E6D3]/30 py-24 dark:from-slate-900 dark:to-slate-800/50">
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
						<span className="text-2xl">💬</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Traveler Stories
						</span>
					</motion.div>
					
					<h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						What Our
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Guests Say
						</span>
					</h2>
					<p className="mb-12 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
						Real experiences from travelers who discovered the magic of Sri Lanka with us.
					</p>
				</motion.div>
				
				<div className="grid gap-8 md:grid-cols-3">
					{items.map((t, i) => (
						<motion.blockquote
							key={`${t.name}-${i}`}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							whileHover={{ y: -8 }}
							className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white p-8 shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50"
						>
							<div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#8B1538]/10 to-[#C75B39]/10 blur-2xl group-hover:from-[#8B1538]/20 group-hover:to-[#C75B39]/20 dark:from-[#FFD700]/10 dark:to-[#FF6B35]/10 dark:group-hover:from-[#FFD700]/20 dark:group-hover:to-[#FF6B35]/20" />
							<div className="relative">
								<div className="mb-4 flex gap-1">
									{Array.from({ length: Math.min(5, t.rating) }).map((_, idx) => (
										<span key={idx} className="text-2xl text-[#FFD700]">⭐</span>
									))}
								</div>
								<p className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-200">
									&ldquo;{t.text}&rdquo;
								</p>
								<footer className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8B1538] to-[#C75B39] text-lg font-bold text-white dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900">
										{t.name.charAt(0)}
									</div>
									<div>
										<p className="font-semibold text-slate-900 dark:text-white">
											{t.name}
										</p>
										<p className="text-sm text-[#8B1538] dark:text-[#FFD700]">
											Verified Traveler
										</p>
									</div>
								</footer>
							</div>
						</motion.blockquote>
					))}
				</div>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="mt-16 text-center"
				>
					<p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
						Ready to create your own Sri Lankan story?
					</p>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link
							to="/register"
							className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
						>
							Start Your Journey
							<span>→</span>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
