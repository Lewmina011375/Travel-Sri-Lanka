import { useEffect, useState } from 'react';
import { apiRequest, api } from '../../api/client';
import {
	AdminPanel,
	AdminCard,
	AdminTableWrap,
	AdminPrimaryButton,
	AdminSecondaryButton,
	adminFieldCls,
} from '../../components/admin/AdminUi';

export default function AdminUsers() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		username: '',
		email: '',
		fullName: '',
		password: '',
		role: 'USER',
	});

	const load = async () => {
		setLoading(true);
		try {
			setRows(await api.users());
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
			if (editing) {
				const body = {
					username: form.username,
					email: form.email,
					fullName: form.fullName,
					role: form.role,
				};
				if (form.password) body.password = form.password;
				await apiRequest('PUT', `/users/${editing.id}`, body);
			} else {
				await apiRequest('POST', '/users', {
					username: form.username,
					email: form.email,
					fullName: form.fullName,
					password: form.password || 'changeme123',
					role: form.role,
				});
			}
			setEditing(null);
			setForm({ username: '', email: '', fullName: '', password: '', role: 'USER' });
			load();
		} catch (err) {
			alert(err.message || 'Save failed');
		}
	};

	const remove = async (id) => {
		if (!confirm('Delete this user?')) return;
		try {
			await apiRequest('DELETE', `/users/${id}`);
			load();
		} catch (err) {
			alert(err.message || 'Delete failed');
		}
	};

	if (loading) {
		return (
			<p className="animate-pulse text-sm text-slate-500 dark:text-slate-400">Loading directory…</p>
		);
	}

	return (
		<AdminPanel
			subtitle="View, add, edit roles, or remove accounts. Password changes on edit are optional."
			actions={
				<AdminPrimaryButton
					type="button"
					onClick={() => {
						setEditing(null);
						setForm({ username: '', email: '', fullName: '', password: '', role: 'USER' });
					}}
				>
					+ New user
				</AdminPrimaryButton>
			}
		>
			<AdminCard
				title={editing ? `Edit user #${editing.id}` : 'Create user'}
				description="All fields except full name are required for new accounts."
			>
				<form onSubmit={save} className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					<input
						placeholder="Username"
						value={form.username}
						onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
						className={adminFieldCls}
						required
					/>
					<input
						placeholder="Email"
						type="email"
						value={form.email}
						onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
						className={adminFieldCls}
						required
					/>
					<input
						placeholder="Full name"
						value={form.fullName}
						onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
						className={adminFieldCls}
					/>
					<input
						placeholder={editing ? 'New password (optional)' : 'Password'}
						type="password"
						value={form.password}
						onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
						className={adminFieldCls}
						required={!editing}
					/>
					<select
						value={form.role}
						onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
						className={adminFieldCls}
					>
						<option value="USER">USER</option>
						<option value="ADMIN">ADMIN</option>
					</select>
					<div className="flex flex-wrap gap-2 md:col-span-2 lg:col-span-3">
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
									setForm({ username: '', email: '', fullName: '', password: '', role: 'USER' });
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
								Username
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Email
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Role
							</th>
							<th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
						{rows.map((u) => (
							<tr key={u.id} className="bg-white transition hover:bg-slate-50/80 dark:bg-transparent dark:hover:bg-slate-800/40">
								<td className="px-5 py-3.5 tabular-nums text-slate-600 dark:text-slate-400">{u.id}</td>
								<td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{u.username}</td>
								<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{u.email}</td>
								<td className="px-5 py-3.5">
									<span
										className={
											u.role === 'ADMIN'
												? 'rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
												: 'rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300'
										}
									>
										{u.role || 'USER'}
									</span>
								</td>
								<td className="px-5 py-3.5">
									<button
										type="button"
										onClick={() => {
											setEditing(u);
											setForm({
												username: u.username,
												email: u.email,
												fullName: u.fullName || '',
												password: '',
												role: u.role || 'USER',
											});
										}}
										className="mr-3 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => remove(u.id)}
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
