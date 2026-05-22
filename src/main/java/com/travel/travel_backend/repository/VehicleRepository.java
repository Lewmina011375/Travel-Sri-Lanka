package com.travel.travel_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel.travel_backend.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	List<Vehicle> findByAvailableTrue();
}
