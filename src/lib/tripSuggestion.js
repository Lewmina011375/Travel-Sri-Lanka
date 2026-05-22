export function suggestTrip({ budget, days, location }, places, hotels) {
	const b = Number(budget) || 0;
	const d = Math.max(1, Number(days) || 1);
	const nights = Math.max(1, d - 1);
	const loc = (location || '').trim().toLowerCase();

	const matchedPlaces = places
		.filter((p) => {
			if (!loc) return true;
			const hay = `${p.name} ${p.city} ${p.country} ${p.description || ''}`.toLowerCase();
			return hay.includes(loc);
		})
		.slice(0, 4);

	const dailyRoomBudget = (b * 0.55) / nights;
	const sortedHotels = [...hotels].sort(
		(a, c) => Number(a.pricePerNight || 0) - Number(c.pricePerNight || 0)
	);
	const affordable = sortedHotels.filter((h) => Number(h.pricePerNight || 0) <= dailyRoomBudget * 1.15);
	const pickedHotels = (affordable.length ? affordable : sortedHotels).slice(0, 3);

	const primaryHotel = pickedHotels[0];
	const hotelTotal = primaryHotel
		? Number(primaryHotel.pricePerNight) * nights
		: Math.round(b * 0.45);
	const activities = Math.round(b * 0.25);
	const transport = Math.round(b * 0.12);
	const buffer = Math.max(0, b - hotelTotal - activities - transport);
	const totalEstimate = Math.min(b, hotelTotal + activities + transport);

	return {
		places: matchedPlaces.length ? matchedPlaces : places.slice(0, 3),
		hotels: pickedHotels,
		nights,
		breakdown: { hotelTotal, activities, transport, buffer: buffer > 0 ? buffer : 0 },
		totalEstimate,
	};
}
