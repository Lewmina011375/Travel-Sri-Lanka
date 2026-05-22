package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.Booking;
import com.travel.travel_backend.model.Hotel;
import com.travel.travel_backend.model.User;
import com.travel.travel_backend.model.Vehicle;
import com.travel.travel_backend.repository.BookingRepository;
import com.travel.travel_backend.repository.HotelRepository;
import com.travel.travel_backend.repository.UserRepository;
import com.travel.travel_backend.repository.VehicleRepository;

@Service
public class BookingService {

	private final BookingRepository bookingRepository;
	private final UserRepository userRepository;
	private final HotelRepository hotelRepository;
	private final VehicleRepository vehicleRepository;

	public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
			HotelRepository hotelRepository, VehicleRepository vehicleRepository) {
		this.bookingRepository = bookingRepository;
		this.userRepository = userRepository;
		this.hotelRepository = hotelRepository;
		this.vehicleRepository = vehicleRepository;
	}

	public List<Booking> findAll() {
		return bookingRepository.findAll();
	}

	public List<Booking> findByUserId(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
		return bookingRepository.findByUser(user);
	}

	public Booking findById(Long id) {
		return bookingRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
	}

	public Booking create(Booking booking) {
		booking.setUser(resolveUser(booking.getUser()));
		booking.setHotel(resolveHotelOptional(booking.getHotel()));
		booking.setVehicle(resolveVehicleOptional(booking.getVehicle()));
		if (booking.getStatus() == null || booking.getStatus().isBlank()) {
			booking.setStatus("PENDING");
		}
		return bookingRepository.save(booking);
	}

	public Booking update(Long id, Booking booking) {
		Booking existing = findById(id);
		existing.setUser(resolveUser(booking.getUser()));
		existing.setHotel(resolveHotelOptional(booking.getHotel()));
		existing.setVehicle(resolveVehicleOptional(booking.getVehicle()));
		existing.setStartDate(booking.getStartDate());
		existing.setEndDate(booking.getEndDate());
		existing.setTotalPrice(booking.getTotalPrice());
		existing.setStatus(booking.getStatus());
		return bookingRepository.save(existing);
	}

	public void delete(Long id) {
		if (!bookingRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found");
		}
		bookingRepository.deleteById(id);
	}

	private User resolveUser(User user) {
		if (user == null || user.getId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id is required");
		}
		return userRepository.findById(user.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
	}

	private Hotel resolveHotelOptional(Hotel hotel) {
		if (hotel == null || hotel.getId() == null) {
			return null;
		}
		return hotelRepository.findById(hotel.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found"));
	}

	private Vehicle resolveVehicleOptional(Vehicle vehicle) {
		if (vehicle == null || vehicle.getId() == null) {
			return null;
		}
		return vehicleRepository.findById(vehicle.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));
	}
}
