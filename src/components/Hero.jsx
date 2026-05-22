import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BG =
	"url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80')";

export default function Hero() {
	return (
		<div
			className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat text-white"
			style={{ backgroundImage: BG }}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/80 via-[#4A7C59]/60 to-[#0077B6]/70" />
			<div className="absolute inset-0 bg-black/30" />
			
			{/* Decorative elements */}
			<div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-[#FFD700]/20 blur-3xl" />
			<div className="absolute bottom-32 left-16 h-40 w-40 rounded-full bg-[#FF6B35]/20 blur-3xl" />
			
			<motion.div
				className="relative z-10 max-w-5xl px-4 text-center"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#FFD700]/50 bg-white/10 px-6 py-2 backdrop-blur-sm"
				>
					<span className="text-[#FFD700]">✦</span>
					<span className="text-sm font-medium tracking-wide text-white/90">
						PEARL OF THE INDIAN OCEAN
					</span>
					<span className="text-[#FFD700]">✦</span>
				</motion.div>
				
				<h1 className="mb-6 font-serif text-5xl font-bold leading-tight drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
					Discover
					<span className="block bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
						Sri Lanka
					</span>
				</h1>
				
				<p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/90 drop-shadow-lg md:text-xl lg:text-2xl">
					From misty tea plantations to ancient temples, pristine beaches to wildlife safaris — 
					experience the wonder of an island paradise like never before.
				</p>
				
				<motion.div 
					className="flex flex-col items-center justify-center gap-4 sm:flex-row"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link
							to="/places"
							className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B1538] to-[#C75B39] px-8 py-4 font-semibold text-white shadow-2xl transition-all hover:shadow-[#8B1538]/50"
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
							className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
						>
							Find Luxury Stays
						</Link>
					</motion.div>
				</motion.div>
				
				{/* Stats */}
				<motion.div
					className="mt-16 grid grid-cols-3 gap-8 border-t border-white/20 pt-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					{[
						{ number: '8+', label: 'UNESCO Sites' },
						{ number: '1340km', label: 'Coastline' },
						{ number: '∞', label: 'Memories' },
					].map((stat) => (
						<div key={stat.label} className="text-center">
							<div className="text-3xl font-bold text-[#FFD700] md:text-4xl">
								{stat.number}
							</div>
							<div className="text-sm font-medium text-white/80 md:text-base">
								{stat.label}
							</div>
						</div>
					))}
				</motion.div>
			</motion.div>
			
			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.8 }}
			>
				<motion.div
					className="flex flex-col items-center gap-2 text-white/60"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<span className="text-xs tracking-widest">SCROLL</span>
					<div className="h-8 w-0.5 bg-gradient-to-b from-white/60 to-transparent" />
				</motion.div>
			</motion.div>
		</div>
	);
}
