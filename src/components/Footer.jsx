import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className="border-t border-[#8B1538]/10 bg-gradient-to-b from-slate-100 to-[#F5E6D3]/50 py-16 dark:border-[#FFD700]/10 dark:from-slate-900 dark:to-slate-800/50">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8B1538] to-[#C75B39] shadow-lg">
								<span className="text-2xl">🇱🇰</span>
							</div>
							<span className="font-serif text-2xl font-bold bg-gradient-to-r from-[#8B1538] to-[#C75B39] bg-clip-text text-transparent dark:from-[#FFD700] dark:to-[#FF6B35]">
								TravelLanka
							</span>
						</div>
						<p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
							Your gateway to the Pearl of the Indian Ocean. Discover ancient heritage, pristine beaches, 
							and warm hospitality in Sri Lanka. Experience the wonder of an island paradise.
						</p>
						<div className="flex gap-4">
							{[
								{ name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/explore/tags/srilanka/' },
								{ name: 'YouTube', icon: '🎬', href: 'https://www.youtube.com/results?search_query=sri+lanka+travel' },
								{ name: 'Facebook', icon: '👥', href: '#' },
							].map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1538]/20 bg-white text-lg transition-all hover:bg-[#8B1538] hover:text-white dark:border-[#FFD700]/20 dark:bg-slate-800 dark:hover:bg-[#FFD700] dark:hover:text-slate-900"
									aria-label={social.name}
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>
					
					<div>
						<h3 className="mb-6 font-semibold text-slate-900 dark:text-white">
							Quick Links
						</h3>
						<ul className="space-y-3">
							{[
								{ name: 'Home', path: '/' },
								{ name: 'Places', path: '/places' },
								{ name: 'Hotels', path: '/hotels' },
								{ name: 'Vehicles', path: '/vehicles' },
								{ name: 'Dashboard', path: '/dashboard' },
							].map((link) => (
								<li key={link.name}>
									<Link
										to={link.path}
										className="text-sm text-slate-600 transition-colors hover:text-[#8B1538] dark:text-slate-400 dark:hover:text-[#FFD700]"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					
					<div>
						<h3 className="mb-6 font-semibold text-slate-900 dark:text-white">
							Contact Us
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start gap-3">
								<span className="mt-0.5 text-[#8B1538] dark:text-[#FFD700]">📍</span>
								<span className="text-sm text-slate-600 dark:text-slate-400">
									Colombo, Sri Lanka
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 text-[#8B1538] dark:text-[#FFD700]">✉️</span>
								<span className="text-sm text-slate-600 dark:text-slate-400">
									hello@travellanka.lk
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 text-[#8B1538] dark:text-[#FFD700]">📞</span>
								<span className="text-sm text-slate-600 dark:text-slate-400">
									+94 11 234 5678
								</span>
							</li>
						</ul>
					</div>
					
					<div>
						<h3 className="mb-6 font-semibold text-slate-900 dark:text-white">
							Account
						</h3>
						<ul className="space-y-3">
							{[
								{ name: 'Login', path: '/login' },
								{ name: 'Register', path: '/register' },
							].map((link) => (
								<li key={link.name}>
									<Link
										to={link.path}
										className="text-sm text-slate-600 transition-colors hover:text-[#8B1538] dark:text-slate-400 dark:hover:text-[#FFD700]"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
						<div className="mt-6 rounded-xl border border-[#8B1538]/20 bg-gradient-to-br from-[#8B1538]/5 to-[#C75B39]/5 p-4 dark:border-[#FFD700]/20 dark:from-[#FFD700]/5 dark:to-[#FF6B35]/5">
							<p className="text-xs font-medium text-slate-700 dark:text-slate-300">
								🙏 Ayubowan
							</p>
							<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
								May you have long life
							</p>
						</div>
					</div>
				</div>
				
				<div className="mt-12 border-t border-slate-200/50 pt-8 dark:border-slate-700/50">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<p className="text-sm text-slate-600 dark:text-slate-400">
							© {new Date().getFullYear()} TravelLanka. All rights reserved.
						</p>
						<div className="flex gap-6 text-sm">
							<a href="#" className="text-slate-600 transition-colors hover:text-[#8B1538] dark:text-slate-400 dark:hover:text-[#FFD700]">
								Privacy Policy
							</a>
							<a href="#" className="text-slate-600 transition-colors hover:text-[#8B1538] dark:text-slate-400 dark:hover:text-[#FFD700]">
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
