package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.Place;
import com.travel.travel_backend.repository.PlaceRepository;

@Service
public class PlaceService {

	private final PlaceRepository placeRepository;

	public PlaceService(PlaceRepository placeRepository) {
		this.placeRepository = placeRepository;
	}

	public List<Place> findAll() {
		return placeRepository.findAll();
	}

	public Place findById(Long id) {
		return placeRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found"));
	}

	public Place create(Place place) {
		if (place.getFeatured() == null) {
			place.setFeatured(false);
		}
		return placeRepository.save(place);
	}

	public Place update(Long id, Place place) {
		Place existing = findById(id);
		existing.setName(place.getName());
		existing.setDescription(place.getDescription());
		existing.setCity(place.getCity());
		existing.setCountry(place.getCountry());
		existing.setImageUrl(place.getImageUrl());
		if (place.getFeatured() != null) {
			existing.setFeatured(place.getFeatured());
		}
		return placeRepository.save(existing);
	}

	public void delete(Long id) {
		if (!placeRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found");
		}
		placeRepository.deleteById(id);
	}
}
