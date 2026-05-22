package com.travel.travel_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel.travel_backend.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

	List<Hotel> findByPlace_Id(Long placeId);
}
