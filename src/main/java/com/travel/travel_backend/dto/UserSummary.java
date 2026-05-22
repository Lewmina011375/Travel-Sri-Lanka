package com.travel.travel_backend.dto;

import com.travel.travel_backend.model.User;

public record UserSummary(Long id, String username, String email, String fullName, String role) {

	public static UserSummary fromEntity(User u) {
		String r = u.getRole() != null && !u.getRole().isBlank() ? u.getRole() : "USER";
		return new UserSummary(u.getId(), u.getUsername(), u.getEmail(), u.getFullName(), r);
	}
}
