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

import com.travel.travel_backend.model.Vehicle;
import com.travel.travel_backend.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

	private final VehicleService vehicleService;

	public VehicleController(VehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	@GetMapping
	public List<Vehicle> list(@RequestParam(required = false) Boolean availableOnly) {
		if (Boolean.TRUE.equals(availableOnly)) {
			return vehicleService.findAvailable();
		}
		return vehicleService.findAll();
	}

	@GetMapping("/{id}")
	public Vehicle get(@PathVariable Long id) {
		return vehicleService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Vehicle create(@RequestBody Vehicle vehicle) {
		return vehicleService.create(vehicle);
	}

	@PutMapping("/{id}")
	public Vehicle update(@PathVariable Long id, @RequestBody Vehicle vehicle) {
		return vehicleService.update(id, vehicle);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		vehicleService.delete(id);
	}
}
