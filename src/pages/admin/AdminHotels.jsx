import { useEffect, useState } from 'react';
import { apiRequest, api } from '../../api/client';
import { AdminPanel, AdminCard, AdminTableWrap, adminFieldCls, AdminSecondaryButton } from '../../components/admin/AdminUi';

export default function AdminHotels() {
	const [rows, setRows] = useState([]);
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		name: '',
		address: '',
		description: '',
		imageUrl: '',
		contactPhone: '',
		pricePerNight: '',
		placeId: '',
		approved: true,
	});

	const load = async () => {
		setLoading(true);
		try {
			const [h, p] = await Promise.all([api.hotels(), api.places()]);
			setRows(Array.isArray(h) ? h : []);
			setPlaces(Array.isArray(p) ? p : []);
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
			const body = {
				name: form.name,
				address: form.address,
				description: form.description,
				imageUrl: form.imageUrl,
				contactPhone: form.contactPhone || null,
				pricePerNight: Number(form.pricePerNight),
				approved: !!form.approved,
				place: { id: Number(form.placeId) },
			};
			if (editing) await apiRequest('PUT', `/hotels/${editing.id}`, body);
			else await apiRequest('POST', '/hotels', body);
			setEditing(null);
			setForm({
				name: '',
				address: '',
				description: '',
				imageUrl: '',
				contactPhone: '',
				pricePerNight: '',
				placeId: places[0]?.id || '',
				approved: true,
			});
			load();
		} catch (err) {
			alert(err.message || 'Save failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Delete hotel?')) return;
		try {
			await apiRequest('DELETE', `/hotels/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	useEffect(() => {
		if (places.length && !form.placeId) {
			setForm((f) => ({ ...f, placeId: String(places[0].id) }));
		}
	}, [places]);

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading hotels…</p>
		);
	}

	return (
		<AdminPanel subtitle="Listings, pricing, contact, and approval before they appear to guests.">
			<AdminCard title={editing ? `Edit hotel #${editing.id}` : 'Add hotel'}>
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
							placeholder="Price per night"
							type="number"
							step="0.01"
							value={form.pricePerNight}
							onChange={(e) => setForm((f) => ({ ...f, pricePerNight: e.target.value }))}
							className={adminFieldCls}
							required
						/>
						<input
							placeholder="Address"
							value={form.address}
							onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
							className={adminFieldCls}
						/>
						<input
							placeholder="Contact phone"
							value={form.contactPhone}
							onChange={(e) => setForm((f) => ({ ...f, contactPhone: e.target.value }))}
							className={adminFieldCls}
						/>
						<input
							placeholder="Image URL"
							value={form.imageUrl}
							onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
							className={`${adminFieldCls} md:col-span-2`}
						/>
						<select
							value={form.placeId}
							onChange={(e) => setForm((f) => ({ ...f, placeId: e.target.value }))}
							className={adminFieldCls}
						>
							{places.map((p) => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>
					<textarea
						placeholder="Description"
						value={form.description}
						onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						className={`w-full ${adminFieldCls}`}
						rows={2}
					/>
					<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
						<input
							type="checkbox"
							checked={form.approved}
							onChange={(e) => setForm((f) => ({ ...f, approved: e.target.checked }))}
							className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
						/>
						Approved / visible on site
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
									setForm({
										name: '',
										address: '',
										description: '',
										imageUrl: '',
										contactPhone: '',
										pricePerNight: '',
										placeId: String(places[0]?.id || ''),
										approved: true,
									});
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
								Price
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Place
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Approved
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
						{rows.map((h) => (
							<tr key={h.id} className="bg-white transition hover:bg-slate-50/80 dark:bg-transparent dark:hover:bg-slate-800/40">
								<td className="px-5 py-3.5 tabular-nums text-slate-600 dark:text-slate-400">{h.id}</td>
								<td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{h.name}</td>
								<td className="px-5 py-3.5 tabular-nums">${h.pricePerNight}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
									{h.place?.name || h.place?.id}
								</td>
								<td className="px-5 py-3.5">
									{h.approved === false ? (
										<span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
											Pending
										</span>
									) : (
										<span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
											Live
										</span>
									)}
								</td>
								<td className="px-5 py-3.5">
									<button
										type="button"
										onClick={() => {
											setEditing(h);
											setForm({
												name: h.name || '',
												address: h.address || '',
												description: h.description || '',
												imageUrl: h.imageUrl || '',
												contactPhone: h.contactPhone || '',
												pricePerNight: String(h.pricePerNight ?? ''),
												placeId: String(h.place?.id || places[0]?.id || ''),
												approved: h.approved !== false,
											});
										}}
										className="mr-3 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => remove(h.id)}
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
