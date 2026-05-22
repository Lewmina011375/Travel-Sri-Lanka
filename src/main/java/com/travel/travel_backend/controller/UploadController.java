package com.travel.travel_backend.controller;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.travel.travel_backend.service.VehicleImageStorageService;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

	private final VehicleImageStorageService vehicleImageStorageService;

	public UploadController(VehicleImageStorageService vehicleImageStorageService) {
		this.vehicleImageStorageService = vehicleImageStorageService;
	}

	@PostMapping(value = "/vehicle-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Map<String, String> uploadVehicleImage(@RequestParam("file") MultipartFile file) {
		String webPath = vehicleImageStorageService.storeAndReturnWebPath(file);
		String url = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path(webPath)
				.build()
				.toUriString();
		return Map.of("url", url);
	}
}
