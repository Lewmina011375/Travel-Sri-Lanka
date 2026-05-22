const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function getJson(path) {
	const res = await fetch(`${API_BASE}${path}`);
	if (!res.ok) throw new Error(`${path} ${res.status}`);
	return res.json();
}

/** Origin only (e.g. http://localhost:8080) for static uploaded files */
export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || API_BASE.replace(/\/api\/?$/, '');

/** Image URL from API (absolute or path like /uploads/...) */
export function resolveMediaUrl(url) {
	if (!url) return '';
	if (url.startsWith('http://') || url.startsWith('https://')) return url;
	return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
}

export async function apiRequest(method, path, body) {
	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});
	if (!res.ok) throw new Error((await res.text()) || String(res.status));
	if (res.status === 204) return null;
	const text = await res.text();
	return text ? JSON.parse(text) : null;
}

export const api = {
	places: () => getJson('/places'),
	hotels: (placeId) =>
		placeId != null ? getJson(`/hotels?placeId=${placeId}`) : getJson('/hotels'),
	vehicles: () => getJson('/vehicles'),
	reviews: (placeId) =>
		placeId != null ? getJson(`/reviews?placeId=${placeId}`) : getJson('/reviews'),
	users: () => getJson('/users'),
	createUser: (body) =>
		fetch(`${API_BASE}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		}).then((r) => {
			if (!r.ok) throw new Error('Register failed');
			return r.json();
		}),
	updateUser: (id, body) =>
		fetch(`${API_BASE}/users/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		}).then((r) => {
			if (!r.ok) throw new Error('Update failed');
			return r.json();
		}),
	login: async (username, password) => {
		let res;
		try {
			res = await fetch(`${API_BASE}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
		} catch (e) {
			throw new Error(
				`Cannot reach API at ${API_BASE}. Start the backend on port 8080 or set VITE_API_URL in .env`
			);
		}
		if (!res.ok) {
			const err = await res.text();
			throw new Error(err || 'Login failed');
		}
		return res.json();
	},
	adminStats: () => getJson('/admin/stats'),
	bookings: () => getJson('/bookings'),
	/** @param {File} file */
	uploadVehicleImage: async (file) => {
		const fd = new FormData();
		fd.append('file', file);
		const res = await fetch(`${API_BASE}/uploads/vehicle-image`, {
			method: 'POST',
			body: fd,
		});
		if (!res.ok) {
			const t = await res.text();
			throw new Error(t || 'Upload failed');
		}
		return res.json();
	},
};

export const FALLBACK_PLACES = [
	{
		id: 'f1',
		name: 'Ella',
		description: 'Lush hills, Nine Arch Bridge, and slow trains through tea country.',
		city: 'Ella',
		country: 'Sri Lanka',
		imageUrl:
			'https://images.unsplash.com/photo-1588258528055-a7976dc7bb76?w=800&q=80',
	},
	{
		id: 'f2',
		name: 'Sigiriya',
		description: 'Ancient rock fortress and UNESCO World Heritage views.',
		city: 'Sigiriya',
		country: 'Sri Lanka',
		imageUrl:
			'https://images.unsplash.com/photo-1578894423669-6a9418dafde0?w=800&q=80',
	},
	{
		id: 'f3',
		name: 'Nuwara Eliya',
		description: 'Cool climate, colonial charm, and endless tea estates.',
		city: 'Nuwara Eliya',
		country: 'Sri Lanka',
		imageUrl:
			'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
	},
];

export function mergePlaces(remoteList) {
	if (!Array.isArray(remoteList) || remoteList.length === 0) return [...FALLBACK_PLACES];
	const names = new Set(remoteList.map((p) => p.name?.toLowerCase()));
	const extra = FALLBACK_PLACES.filter((p) => !names.has(p.name.toLowerCase()));
	const merged = [...remoteList, ...extra];
	return merged.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
