package com.travel.travel_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record AdminStatsDto(
		long totalUsers,
		long totalBookings,
		long totalPlaces,
		long totalHotels,
		long totalVehicles,
		long totalReviews,
		long pendingReviews,
		long pendingHotels,
		BigDecimal totalRevenue,
		List<PopularItemDto> popularPlaces,
		List<PopularItemDto> popularHotels,
		List<PopularItemDto> popularVehicles) {
}
