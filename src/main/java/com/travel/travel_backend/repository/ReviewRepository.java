package com.travel.travel_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel.travel_backend.model.Place;
import com.travel.travel_backend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByPlace(Place place);
}
