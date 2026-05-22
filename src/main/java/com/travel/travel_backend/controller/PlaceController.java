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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.travel.travel_backend.model.Place;
import com.travel.travel_backend.service.PlaceService;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

	private final PlaceService placeService;

	public PlaceController(PlaceService placeService) {
		this.placeService = placeService;
	}

	@GetMapping
	public List<Place> list() {
		return placeService.findAll();
	}

	@GetMapping("/{id}")
	public Place get(@PathVariable Long id) {
		return placeService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Place create(@RequestBody Place place) {
		return placeService.create(place);
	}

	@PutMapping("/{id}")
	public Place update(@PathVariable Long id, @RequestBody Place place) {
		return placeService.update(id, place);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		placeService.delete(id);
	}
}
