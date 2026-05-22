import { useEffect, useState } from 'react';
import { apiRequest, api, resolveMediaUrl } from '../../api/client';
import { AdminPanel, AdminCard, AdminTableWrap, adminFieldCls, AdminSecondaryButton } from '../../components/admin/AdminUi';

export default function AdminVehicles() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(null);
	const [uploading, setUploading] = useState(false);
	const emptyForm = () => ({
		type: '',
		model: '',
		plateNumber: '',
		pricePerDay: '',
		available: true,
		imageUrl: '',
	});
	const [form, setForm] = useState(emptyForm);

	const load = async () => {
		setLoading(true);
		try {
			setRows(await api.vehicles());
		} catch {
			setRows([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const onPickImage = async (e) => {
		const file = e.target.files?.[0];
		e.target.value = '';
		if (!file) return;
		setUploading(true);
		try {
			const { url } = await api.uploadVehicleImage(file);
			setForm((f) => ({ ...f, imageUrl: url }));
		} catch (err) {
			alert(err.message || 'Upload failed');
		} finally {
			setUploading(false);
		}
	};

	const save = async (e) => {
		e.preventDefault();
		try {
			const body = {
				type: form.type,
				model: form.model,
				plateNumber: form.plateNumber,
				pricePerDay: Number(form.pricePerDay),
				available: !!form.available,
				imageUrl: form.imageUrl?.trim() || null,
			};
			if (editing) await apiRequest('PUT', `/vehicles/${editing.id}`, body);
			else await apiRequest('POST', '/vehicles', body);
			setEditing(null);
			setForm(emptyForm());
			load();
		} catch (err) {
			alert(err.message || 'Save failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Delete vehicle?')) return;
		try {
			await apiRequest('DELETE', `/vehicles/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading fleet…</p>
		);
	}

	return (
		<AdminPanel subtitle="Fleet types, daily rates, photos, and availability for rentals.">
			<AdminCard title={editing ? `Edit vehicle #${editing.id}` : 'Add vehicle'}>
				<form onSubmit={save} className="grid gap-3 md:grid-cols-2">
					<input
						placeholder="Type (Car / Van / Bus)"
						value={form.type}
						onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
						className={adminFieldCls}
						required
					/>
					<input
						placeholder="Model"
						value={form.model}
						onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
						className={adminFieldCls}
					/>
					<input
						placeholder="Plate number"
						value={form.plateNumber}
						onChange={(e) => setForm((f) => ({ ...f, plateNumber: e.target.value }))}
						className={adminFieldCls}
					/>
					<input
						placeholder="Price per day"
						type="number"
						step="0.01"
						value={form.pricePerDay}
						onChange={(e) => setForm((f) => ({ ...f, pricePerDay: e.target.value }))}
						className={adminFieldCls}
						required
					/>
					<div className="md:col-span-2 space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/40">
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
							Vehicle photo
						</p>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
							<label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
								<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={onPickImage} disabled={uploading} />
								{uploading ? 'Uploading…' : 'Upload image'}
							</label>
							<input
								placeholder="Or paste image URL"
								value={form.imageUrl}
								onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
								className={adminFieldCls + ' flex-1'}
							/>
						</div>
						{form.imageUrl?.trim() && (
							<div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
								<img
									src={resolveMediaUrl(form.imageUrl.trim())}
									alt="Preview"
									className="h-40 w-full object-cover"
								/>
							</div>
						)}
					</div>
					<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300 md:col-span-2">
						<input
							type="checkbox"
							checked={form.available}
							onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
							className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
						/>
						Available for booking
					</label>
					<div className="flex flex-wrap gap-2 md:col-span-2">
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
									setForm(emptyForm());
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
								Photo
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								ID
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Type
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Model
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								$/day
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Avail
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
						{rows.map((v) => (
							<tr key={v.id} className="bg-white transition hover:bg-slate-50/80 dark:bg-transparent dark:hover:bg-slate-800/40">
								<td className="px-5 py-2">
									{v.imageUrl ? (
										<img
											src={resolveMediaUrl(v.imageUrl)}
											alt=""
											className="h-11 w-16 rounded-lg object-cover"
										/>
									) : (
										<span className="flex h-11 w-16 items-center justify-center rounded-lg bg-slate-100 text-lg dark:bg-slate-800">
											{v.type === 'Bus' ? '🚌' : v.type === 'Van' ? '🚐' : '🚗'}
										</span>
									)}
								</td>
								<td className="px-5 py-3.5 tabular-nums text-slate-600 dark:text-slate-400">{v.id}</td>
								<td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{v.type}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{v.model}</td>
								<td className="px-5 py-3.5 tabular-nums">${v.pricePerDay}</td>
								<td className="px-5 py-3.5">
									{v.available ? (
										<span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
											Yes
										</span>
									) : (
										<span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
											No
										</span>
									)}
								</td>
								<td className="px-5 py-3.5">
									<button
										type="button"
										onClick={() => {
											setEditing(v);
											setForm({
												type: v.type || '',
												model: v.model || '',
												plateNumber: v.plateNumber || '',
												pricePerDay: String(v.pricePerDay ?? ''),
												available: !!v.available,
												imageUrl: v.imageUrl || '',
											});
										}}
										className="mr-3 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => remove(v.id)}
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
