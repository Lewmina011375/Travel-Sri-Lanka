package com.travel.travel_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travel.travel_backend.dto.AdminStatsDto;
import com.travel.travel_backend.service.AdminStatsService;

@RestController
@RequestMapping("/api/admin")
public class AdminStatsController {

	private final AdminStatsService adminStatsService;

	public AdminStatsController(AdminStatsService adminStatsService) {
		this.adminStatsService = adminStatsService;
	}

	@GetMapping("/stats")
	public AdminStatsDto stats() {
		return adminStatsService.buildStats();
	}
}
