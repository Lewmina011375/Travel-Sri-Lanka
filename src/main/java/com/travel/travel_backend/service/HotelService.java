package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.Hotel;
import com.travel.travel_backend.model.Place;
import com.travel.travel_backend.repository.HotelRepository;
import com.travel.travel_backend.repository.PlaceRepository;

@Service
public class HotelService {

	private final HotelRepository hotelRepository;
	private final PlaceRepository placeRepository;

	public HotelService(HotelRepository hotelRepository, PlaceRepository placeRepository) {
		this.hotelRepository = hotelRepository;
		this.placeRepository = placeRepository;
	}

	public List<Hotel> findAll() {
		return hotelRepository.findAll();
	}

	public List<Hotel> findByPlaceId(Long placeId) {
		return hotelRepository.findByPlace_Id(placeId);
	}

	public Hotel findById(Long id) {
		return hotelRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found"));
	}

	public Hotel create(Hotel hotel) {
		hotel.setPlace(resolvePlace(hotel.getPlace()));
		if (hotel.getApproved() == null) {
			hotel.setApproved(true);
		}
		return hotelRepository.save(hotel);
	}

	public Hotel update(Long id, Hotel hotel) {
		Hotel existing = findById(id);
		existing.setName(hotel.getName());
		existing.setDescription(hotel.getDescription());
		existing.setAddress(hotel.getAddress());
		existing.setPlace(resolvePlace(hotel.getPlace()));
		existing.setPricePerNight(hotel.getPricePerNight());
		existing.setImageUrl(hotel.getImageUrl());
		if (hotel.getApproved() != null) {
			existing.setApproved(hotel.getApproved());
		}
		if (hotel.getContactPhone() != null) {
			existing.setContactPhone(hotel.getContactPhone());
		}
		return hotelRepository.save(existing);
	}

	public void delete(Long id) {
		if (!hotelRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found");
		}
		hotelRepository.deleteById(id);
	}

	private Place resolvePlace(Place place) {
		if (place == null || place.getId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Place id is required");
		}
		return placeRepository.findById(place.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found"));
	}
}
