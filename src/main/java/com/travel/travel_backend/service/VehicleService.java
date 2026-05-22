package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.Vehicle;
import com.travel.travel_backend.repository.VehicleRepository;

@Service
public class VehicleService {

	private final VehicleRepository vehicleRepository;

	public VehicleService(VehicleRepository vehicleRepository) {
		this.vehicleRepository = vehicleRepository;
	}

	public List<Vehicle> findAll() {
		return vehicleRepository.findAll();
	}

	public List<Vehicle> findAvailable() {
		return vehicleRepository.findByAvailableTrue();
	}

	public Vehicle findById(Long id) {
		return vehicleRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));
	}

	public Vehicle create(Vehicle vehicle) {
		if (vehicle.getAvailable() == null) {
			vehicle.setAvailable(true);
		}
		return vehicleRepository.save(vehicle);
	}

	public Vehicle update(Long id, Vehicle vehicle) {
		Vehicle existing = findById(id);
		existing.setType(vehicle.getType());
		existing.setModel(vehicle.getModel());
		existing.setPlateNumber(vehicle.getPlateNumber());
		existing.setPricePerDay(vehicle.getPricePerDay());
		existing.setAvailable(vehicle.getAvailable() != null ? vehicle.getAvailable() : existing.getAvailable());
		existing.setImageUrl(vehicle.getImageUrl());
		return vehicleRepository.save(existing);
	}

	public void delete(Long id) {
		if (!vehicleRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
		}
		vehicleRepository.deleteById(id);
	}
}
