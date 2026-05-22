package com.travel.travel_backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travel.travel_backend.dto.AdminStatsDto;
import com.travel.travel_backend.dto.PopularItemDto;
import com.travel.travel_backend.model.Booking;
import com.travel.travel_backend.model.Hotel;
import com.travel.travel_backend.model.Review;
import com.travel.travel_backend.repository.BookingRepository;
import com.travel.travel_backend.repository.HotelRepository;
import com.travel.travel_backend.repository.PlaceRepository;
import com.travel.travel_backend.repository.ReviewRepository;
import com.travel.travel_backend.repository.UserRepository;
import com.travel.travel_backend.repository.VehicleRepository;

@Service
public class AdminStatsService {

	private final UserRepository userRepository;
	private final BookingRepository bookingRepository;
	private final PlaceRepository placeRepository;
	private final HotelRepository hotelRepository;
	private final VehicleRepository vehicleRepository;
	private final ReviewRepository reviewRepository;

	public AdminStatsService(UserRepository userRepository, BookingRepository bookingRepository,
			PlaceRepository placeRepository, HotelRepository hotelRepository,
			VehicleRepository vehicleRepository, ReviewRepository reviewRepository) {
		this.userRepository = userRepository;
		this.bookingRepository = bookingRepository;
		this.placeRepository = placeRepository;
		this.hotelRepository = hotelRepository;
		this.vehicleRepository = vehicleRepository;
		this.reviewRepository = reviewRepository;
	}

	@Transactional(readOnly = true)
	public AdminStatsDto buildStats() {
		List<Review> reviews = reviewRepository.findAll();
		long pendingReviews = reviews.stream().filter(r -> !Boolean.TRUE.equals(r.getApproved())).count();
		List<Hotel> hotels = hotelRepository.findAll();
		long pendingHotels = hotels.stream().filter(h -> !Boolean.TRUE.equals(h.getApproved())).count();

		BigDecimal revenue = bookingRepository.sumTotalPrice();
		if (revenue == null) {
			revenue = BigDecimal.ZERO;
		}

		Map<Long, Long> reviewsPerPlace = new HashMap<>();
		for (Review r : reviews) {
			if (r.getPlace() != null && r.getPlace().getId() != null) {
				reviewsPerPlace.merge(r.getPlace().getId(), 1L, Long::sum);
			}
		}
		List<PopularItemDto> popularPlaces = reviewsPerPlace.entrySet().stream()
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(5)
				.map(e -> placeRepository.findById(e.getKey()).map(p -> new PopularItemDto(p.getId(), p.getName(), e.getValue())).orElse(null))
				.filter(x -> x != null)
				.collect(Collectors.toCollection(ArrayList::new));

		Map<Long, Long> bookingsPerHotel = new HashMap<>();
		for (Booking b : bookingRepository.findAll()) {
			if (b.getHotel() != null && b.getHotel().getId() != null) {
				bookingsPerHotel.merge(b.getHotel().getId(), 1L, Long::sum);
			}
		}
		List<PopularItemDto> popularHotels = bookingsPerHotel.entrySet().stream()
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(5)
				.map(e -> hotelRepository.findById(e.getKey()).map(h -> new PopularItemDto(h.getId(), h.getName(), e.getValue())).orElse(null))
				.filter(x -> x != null)
				.collect(Collectors.toCollection(ArrayList::new));

		Map<Long, Long> bookingsPerVehicle = new HashMap<>();
		for (Booking b : bookingRepository.findAll()) {
			if (b.getVehicle() != null && b.getVehicle().getId() != null) {
				bookingsPerVehicle.merge(b.getVehicle().getId(), 1L, Long::sum);
			}
		}
		List<PopularItemDto> popularVehicles = bookingsPerVehicle.entrySet().stream()
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(5)
				.map(e -> vehicleRepository.findById(e.getKey()).map(v -> new PopularItemDto(v.getId(), v.getType() + " · " + (v.getModel() != null ? v.getModel() : ""), e.getValue())).orElse(null))
				.filter(x -> x != null)
				.collect(Collectors.toCollection(ArrayList::new));

		return new AdminStatsDto(
				userRepository.count(),
				bookingRepository.count(),
				placeRepository.count(),
				hotelRepository.count(),
				vehicleRepository.count(),
				reviewRepository.count(),
				pendingReviews,
				pendingHotels,
				revenue,
				popularPlaces,
				popularHotels,
				popularVehicles);
	}
}
