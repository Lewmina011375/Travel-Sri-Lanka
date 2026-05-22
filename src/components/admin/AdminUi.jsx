/** Shared layout primitives for admin area — consistent professional chrome */

export const adminFieldCls =
	'rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-sky-500/0 transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500';

export function AdminPanel({ title, subtitle, actions, children }) {
	return (
		<div className="space-y-8">
			{(title || subtitle || actions) && (
				<div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80 sm:flex-row sm:items-end sm:justify-between">
					<div>
						{title && (
							<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
								{title}
							</h1>
						)}
						{subtitle && (
							<p
								className={`max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 ${title ? 'mt-2' : ''}`}
							>
								{subtitle}
							</p>
						)}
					</div>
					{actions && <div className="flex flex-shrink-0 flex-wrap gap-2">{actions}</div>}
				</div>
			)}
			{children}
		</div>
	);
}

export function AdminCard({ title, description, children, className = '' }) {
	return (
		<div
			className={`rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
		>
			{(title || description) && (
				<div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
					{title && <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>}
					{description && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
				</div>
			)}
			<div className="p-6">{children}</div>
		</div>
	);
}

export function AdminTableWrap({ children }) {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
			<div className="overflow-x-auto">{children}</div>
		</div>
	);
}

export function AdminPrimaryButton({ children, ...props }) {
	return (
		<button
			type="button"
			className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-900/20 transition hover:bg-sky-500 active:scale-[0.98] dark:shadow-none"
			{...props}
		>
			{children}
		</button>
	);
}

export function AdminSecondaryButton({ children, className = '', ...props }) {
	return (
		<button
			type="button"
			className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
