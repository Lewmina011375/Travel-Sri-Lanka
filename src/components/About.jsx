import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
	return (
		<section id="about" className="scroll-mt-24 bg-gradient-to-b from-white to-[#F5E6D3]/30 py-24 dark:from-slate-900 dark:to-slate-800/50">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mx-auto max-w-4xl text-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538]/10 to-[#C75B39]/10 px-6 py-2 border border-[#8B1538]/20 dark:border-[#FFD700]/20"
					>
						<span className="text-2xl">🙏</span>
						<span className="text-sm font-medium text-[#8B1538] dark:text-[#FFD700]">
							Ayubowan - Welcome
						</span>
					</motion.div>
					
					<h2 className="mb-6 font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
						Experience the
						<span className="block bg-gradient-to-r from-[#8B1538] via-[#C75B39] to-[#FF6B35] bg-clip-text text-transparent">
							Wonder of Sri Lanka
						</span>
					</h2>
					
					<p className="mb-12 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
						TravelLanka is your gateway to discovering the Pearl of the Indian Ocean — from misty 
						tea plantations in Nuwara Eliya to the ancient fortress of Sigiriya, from the golden beaches 
						of Mirissa to the wildlife of Yala. Experience authentic Sri Lankan hospitality, rich cultural 
						heritage, and breathtaking natural beauty.
					</p>
					
					<div className="mb-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
						{[
							{ icon: '🏛️', title: 'Ancient Heritage', desc: '8 UNESCO World Heritage Sites' },
							{ icon: '🏖️', title: 'Pristine Beaches', desc: '1,340km of coastline' },
							{ icon: '🐘', title: 'Wildlife Safari', desc: 'Diverse flora & fauna' },
							{ icon: '🍵', title: 'Tea Country', desc: 'World-famous Ceylon tea' },
						].map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
								className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:border-[#8B1538]/30 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-[#FFD700]/30"
							>
								<div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#8B1538]/10 to-[#C75B39]/10 blur-2xl group-hover:from-[#8B1538]/20 group-hover:to-[#C75B39]/20 dark:from-[#FFD700]/10 dark:to-[#FF6B35]/10 dark:group-hover:from-[#FFD700]/20 dark:group-hover:to-[#FF6B35]/20" />
								<div className="relative">
									<div className="mb-3 text-4xl">{feature.icon}</div>
									<h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
										{feature.title}
									</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										{feature.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
					
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.7, duration: 0.5 }}
						className="flex flex-col items-center justify-center gap-4 sm:flex-row"
					>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/places"
								className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl dark:from-[#FFD700] dark:to-[#FF6B35] dark:text-slate-900"
							>
								Explore Destinations
								<motion.span
									className="transition-transform group-hover:translate-x-1"
								>
									→
								</motion.span>
							</Link>
						</motion.div>
						
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/hotels"
								className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B1538]/30 px-8 py-4 font-semibold text-[#8B1538] transition-all hover:bg-[#8B1538] hover:text-white dark:border-[#FFD700]/30 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
							>
								Find Luxury Stays
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
