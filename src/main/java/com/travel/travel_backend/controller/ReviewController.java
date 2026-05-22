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

import com.travel.travel_backend.model.Review;
import com.travel.travel_backend.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	private final ReviewService reviewService;

	public ReviewController(ReviewService reviewService) {
		this.reviewService = reviewService;
	}

	@GetMapping
	public List<Review> list(@RequestParam(required = false) Long placeId) {
		if (placeId != null) {
			return reviewService.findByPlaceId(placeId);
		}
		return reviewService.findAll();
	}

	@GetMapping("/{id}")
	public Review get(@PathVariable Long id) {
		return reviewService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Review create(@RequestBody Review review) {
		return reviewService.create(review);
	}

	@PutMapping("/{id}")
	public Review update(@PathVariable Long id, @RequestBody Review review) {
		return reviewService.update(id, review);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		reviewService.delete(id);
	}
}
