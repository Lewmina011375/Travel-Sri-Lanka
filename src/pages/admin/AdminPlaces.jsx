import { useEffect, useState } from 'react';
import { apiRequest, api } from '../../api/client';
import { AdminPanel, AdminCard, AdminTableWrap, adminFieldCls, AdminSecondaryButton } from '../../components/admin/AdminUi';

export default function AdminPlaces() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		name: '',
		city: '',
		country: '',
		description: '',
		imageUrl: '',
		featured: false,
	});

	const load = async () => {
		setLoading(true);
		try {
			setRows(await api.places());
		} catch {
			setRows([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const save = async (e) => {
		e.preventDefault();
		try {
			const body = { ...form, featured: !!form.featured };
			if (editing) await apiRequest('PUT', `/places/${editing.id}`, body);
			else await apiRequest('POST', '/places', body);
			setEditing(null);
			setForm({ name: '', city: '', country: '', description: '', imageUrl: '', featured: false });
			load();
		} catch (err) {
			alert(err.message || 'Save failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Delete this place?')) return;
		try {
			await apiRequest('DELETE', `/places/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading places…</p>
		);
	}

	return (
		<AdminPanel subtitle="Create destinations, attach media, and highlight featured spots on the home page.">
			<AdminCard title={editing ? `Edit place #${editing.id}` : 'Add place'}>
				<form onSubmit={save} className="space-y-4">
					<div className="grid gap-3 md:grid-cols-2">
						<input
							placeholder="Name"
							value={form.name}
							onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
							className={adminFieldCls}
							required
						/>
						<input
							placeholder="City"
							value={form.city}
							onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
							className={adminFieldCls}
						/>
						<input
							placeholder="Country"
							value={form.country}
							onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
							className={adminFieldCls}
						/>
						<input
							placeholder="Image URL"
							value={form.imageUrl}
							onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
							className={adminFieldCls}
						/>
					</div>
					<textarea
						placeholder="Description"
						value={form.description}
						onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						className={`w-full ${adminFieldCls}`}
						rows={3}
					/>
					<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
						<input
							type="checkbox"
							checked={form.featured}
							onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
							className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
						/>
						Featured on home
					</label>
					<div className="flex flex-wrap gap-2">
						<button
							type="submit"
							className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
						>
							Save
						</button>
						{editing && (
							<AdminSecondaryButton
								type="button"
								onClick={() => {
									setEditing(null);
									setForm({ name: '', city: '', country: '', description: '', imageUrl: '', featured: false });
								}}
							>
								Cancel
							</AdminSecondaryButton>
						)}
					</div>
				</form>
			</AdminCard>

			<AdminTableWrap>
				<table className="min-w-full text-left text-sm">
					<thead className="border-b border-slate-100 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-800/40">
						<tr>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								ID
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Name
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Location
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Featured
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
						{rows.map((p) => (
							<tr key={p.id} className="bg-white transition hover:bg-slate-50/80 dark:bg-transparent dark:hover:bg-slate-800/40">
								<td className="px-5 py-3.5 tabular-nums text-slate-600 dark:text-slate-400">{p.id}</td>
								<td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{p.name}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
									{p.city}, {p.country}
								</td>
								<td className="px-5 py-3.5">
									{p.featured ? (
										<span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
											Featured
										</span>
									) : (
										<span className="text-slate-400">—</span>
									)}
								</td>
								<td className="px-5 py-3.5">
									<button
										type="button"
										onClick={() => {
											setEditing(p);
											setForm({
												name: p.name || '',
												city: p.city || '',
												country: p.country || '',
												description: p.description || '',
												imageUrl: p.imageUrl || '',
												featured: !!p.featured,
											});
										}}
										className="mr-3 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => remove(p.id)}
										className="text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</AdminTableWrap>
		</AdminPanel>
	);
}
