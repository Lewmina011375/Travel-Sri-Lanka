import { useEffect, useState } from 'react';
import { apiRequest, api } from '../../api/client';
import { AdminPanel, AdminTableWrap, adminFieldCls } from '../../components/admin/AdminUi';

export default function AdminBookings() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);

	const load = async () => {
		setLoading(true);
		try {
			setRows(await api.bookings());
		} catch {
			setRows([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const cancel = async (b) => {
		if (!confirm('Set status to CANCELLED?')) return;
		try {
			await apiRequest('PUT', `/bookings/${b.id}`, {
				user: { id: b.user?.id },
				hotel: b.hotel ? { id: b.hotel.id } : null,
				vehicle: b.vehicle ? { id: b.vehicle.id } : null,
				startDate: b.startDate,
				endDate: b.endDate,
				totalPrice: b.totalPrice,
				status: 'CANCELLED',
			});
			load();
		} catch (err) {
			alert(err.message || 'Update failed');
		}
	};

	const updateStatus = async (b, status) => {
		try {
			await apiRequest('PUT', `/bookings/${b.id}`, {
				user: { id: b.user?.id },
				hotel: b.hotel ? { id: b.hotel.id } : null,
				vehicle: b.vehicle ? { id: b.vehicle.id } : null,
				startDate: b.startDate,
				endDate: b.endDate,
				totalPrice: b.totalPrice,
				status,
			});
			load();
		} catch (err) {
			alert(err.message || 'Update failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Permanently delete booking?')) return;
		try {
			await apiRequest('DELETE', `/bookings/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading reservations…</p>
		);
	}

	return (
		<AdminPanel subtitle="Read-only ledger with inline status updates. Changes apply immediately to the API.">
			<AdminTableWrap>
				<table className="min-w-full text-left text-sm">
					<thead className="border-b border-slate-100 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-800/40">
						<tr>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								ID
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								User
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Hotel
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Vehicle
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Dates
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Total
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Status
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
						{rows.map((b) => (
							<tr key={b.id} className="bg-white transition hover:bg-slate-50/80 dark:bg-transparent dark:hover:bg-slate-800/40">
								<td className="px-5 py-3.5 tabular-nums text-slate-600 dark:text-slate-400">{b.id}</td>
								<td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{b.user?.username}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{b.hotel?.name || '—'}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{b.vehicle?.type || '—'}</td>
								<td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
									{b.startDate} → {b.endDate}
								</td>
								<td className="px-5 py-3.5 tabular-nums font-medium text-slate-900 dark:text-white">
									${b.totalPrice}
								</td>
								<td className="px-5 py-3.5">
									<select
										value={b.status || 'PENDING'}
										onChange={(e) => updateStatus(b, e.target.value)}
										className={`${adminFieldCls} !py-1.5 text-xs`}
									>
										<option value="PENDING">PENDING</option>
										<option value="CONFIRMED">CONFIRMED</option>
										<option value="CANCELLED">CANCELLED</option>
									</select>
								</td>
								<td className="whitespace-nowrap px-5 py-3.5">
									<button
										type="button"
										onClick={() => cancel(b)}
										className="text-sm font-medium text-amber-700 hover:text-amber-600 dark:text-amber-400"
									>
										Cancel
									</button>
									<button
										type="button"
										onClick={() => remove(b.id)}
										className="ml-3 text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
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
