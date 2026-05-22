package com.travel.travel_backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.dto.AuthResponse;
import com.travel.travel_backend.dto.LoginRequest;
import com.travel.travel_backend.dto.UserSummary;
import com.travel.travel_backend.model.User;
import com.travel.travel_backend.repository.UserRepository;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthResponse login(LoginRequest request) {
		if (request.username() == null || request.username().isBlank()
				|| request.password() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username and password required");
		}
		User user = userRepository.findByUsername(request.username().trim())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
		if (!passwordEncoder.matches(request.password(), user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
		}
		return new AuthResponse(UserSummary.fromEntity(user));
	}
}
