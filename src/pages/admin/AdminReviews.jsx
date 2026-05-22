import { useEffect, useState } from 'react';
import { apiRequest, api } from '../../api/client';
import { AdminPanel, AdminCard } from '../../components/admin/AdminUi';

export default function AdminReviews() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);

	const load = async () => {
		setLoading(true);
		try {
			setRows(await api.reviews());
		} catch {
			setRows([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const setApproved = async (r, approved) => {
		try {
			await apiRequest('PUT', `/reviews/${r.id}`, {
				user: { id: r.user?.id },
				place: { id: r.place?.id },
				rating: r.rating,
				comment: r.comment,
				approved,
			});
			load();
		} catch (err) {
			alert(err.message || 'Update failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Delete review?')) return;
		try {
			await apiRequest('DELETE', `/reviews/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading reviews…</p>
		);
	}

	return (
		<AdminPanel subtitle="Approve trustworthy feedback or hide abuse. Only approved reviews surface on place pages.">
			<div className="space-y-4">
				{rows.length === 0 && (
					<AdminCard title="All clear">
						<p className="text-sm text-slate-500 dark:text-slate-400">No reviews in the database yet.</p>
					</AdminCard>
				)}
				{rows.map((r) => (
					<AdminCard key={r.id} className="!shadow-md">
						<div className="-m-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
							<div className="min-w-0 flex-1 space-y-2">
								<div className="flex flex-wrap items-center gap-2">
									<p className="font-semibold text-slate-900 dark:text-white">
										{r.user?.username}
									</p>
									<span className="text-slate-400">·</span>
									<p className="truncate text-sm text-slate-600 dark:text-slate-400">{r.place?.name}</p>
								</div>
								<p className="text-sm font-medium text-amber-600 dark:text-amber-400">
									{r.rating} / 5 stars
								</p>
								<p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{r.comment}</p>
							</div>
							<div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
								<span
									className={
										r.approved === false
											? 'inline-flex w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-900/40 dark:text-rose-200'
											: 'inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
									}
								>
									{r.approved === false ? 'Hidden' : 'Approved'}
								</span>
								<div className="flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => setApproved(r, true)}
										className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
									>
										Approve
									</button>
									<button
										type="button"
										onClick={() => setApproved(r, false)}
										className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
									>
										Hide
									</button>
									<button
										type="button"
										onClick={() => remove(r.id)}
										className="rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/40"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</AdminCard>
				))}
			</div>
		</AdminPanel>
	);
}
