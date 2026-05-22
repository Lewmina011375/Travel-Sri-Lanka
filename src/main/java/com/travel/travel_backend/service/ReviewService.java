package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.Place;
import com.travel.travel_backend.model.Review;
import com.travel.travel_backend.model.User;
import com.travel.travel_backend.repository.PlaceRepository;
import com.travel.travel_backend.repository.ReviewRepository;
import com.travel.travel_backend.repository.UserRepository;

@Service
public class ReviewService {

	private final ReviewRepository reviewRepository;
	private final UserRepository userRepository;
	private final PlaceRepository placeRepository;

	public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
			PlaceRepository placeRepository) {
		this.reviewRepository = reviewRepository;
		this.userRepository = userRepository;
		this.placeRepository = placeRepository;
	}

	public List<Review> findAll() {
		return reviewRepository.findAll();
	}

	public List<Review> findByPlaceId(Long placeId) {
		Place place = placeRepository.findById(placeId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found"));
		return reviewRepository.findByPlace(place);
	}

	public Review findById(Long id) {
		return reviewRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
	}

	public Review create(Review review) {
		review.setUser(resolveUser(review.getUser()));
		review.setPlace(resolvePlace(review.getPlace()));
		validateRating(review.getRating());
		if (review.getApproved() == null) {
			review.setApproved(true);
		}
		return reviewRepository.save(review);
	}

	public Review update(Long id, Review review) {
		Review existing = findById(id);
		existing.setUser(resolveUser(review.getUser()));
		existing.setPlace(resolvePlace(review.getPlace()));
		validateRating(review.getRating());
		existing.setRating(review.getRating());
		existing.setComment(review.getComment());
		if (review.getApproved() != null) {
			existing.setApproved(review.getApproved());
		}
		return reviewRepository.save(existing);
	}

	public void delete(Long id) {
		if (!reviewRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
		}
		reviewRepository.deleteById(id);
	}

	private User resolveUser(User user) {
		if (user == null || user.getId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id is required");
		}
		return userRepository.findById(user.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
	}

	private Place resolvePlace(Place place) {
		if (place == null || place.getId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Place id is required");
		}
		return placeRepository.findById(place.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found"));
	}

	private void validateRating(Integer rating) {
		if (rating == null || rating < 1 || rating > 5) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
		}
	}
}
