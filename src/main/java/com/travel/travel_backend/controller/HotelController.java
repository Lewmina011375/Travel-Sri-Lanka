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

import com.travel.travel_backend.model.Hotel;
import com.travel.travel_backend.service.HotelService;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

	private final HotelService hotelService;

	public HotelController(HotelService hotelService) {
		this.hotelService = hotelService;
	}

	@GetMapping
	public List<Hotel> list(@RequestParam(required = false) Long placeId) {
		if (placeId != null) {
			return hotelService.findByPlaceId(placeId);
		}
		return hotelService.findAll();
	}

	@GetMapping("/{id}")
	public Hotel get(@PathVariable Long id) {
		return hotelService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Hotel create(@RequestBody Hotel hotel) {
		return hotelService.create(hotel);
	}

	@PutMapping("/{id}")
	public Hotel update(@PathVariable Long id, @RequestBody Hotel hotel) {
		return hotelService.update(id, hotel);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		hotelService.delete(id);
	}
}
