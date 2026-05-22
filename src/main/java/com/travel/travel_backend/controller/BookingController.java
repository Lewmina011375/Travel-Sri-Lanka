package com.travel.travel_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.travel.travel_backend.model.Booking;
import com.travel.travel_backend.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	private final BookingService bookingService;

	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@GetMapping
	public List<Booking> list(@RequestParam(required = false) Long userId) {
		if (userId != null) {
			return bookingService.findByUserId(userId);
		}
		return bookingService.findAll();
	}

	@GetMapping("/{id}")
	public Booking get(@PathVariable Long id) {
		return bookingService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Booking create(@RequestBody Booking booking) {
		return bookingService.create(booking);
	}

	@PutMapping("/{id}")
	public Booking update(@PathVariable Long id, @RequestBody Booking booking) {
		return bookingService.update(id, booking);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		bookingService.delete(id);
	}
}
