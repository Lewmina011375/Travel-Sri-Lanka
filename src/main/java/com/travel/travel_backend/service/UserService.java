package com.travel.travel_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.travel.travel_backend.model.User;
import com.travel.travel_backend.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
	}

	public User create(User user) {
		encodePasswordIfPlain(user);
		if (user.getRole() == null || user.getRole().isBlank()) {
			user.setRole("USER");
		}
		return userRepository.save(user);
	}

	public User update(Long id, User user) {
		User existing = findById(id);
		existing.setUsername(user.getUsername());
		existing.setEmail(user.getEmail());
		if (user.getPassword() != null && !user.getPassword().isBlank()) {
			encodePasswordIfPlain(user);
			existing.setPassword(user.getPassword());
		}
		existing.setFullName(user.getFullName());
		if (user.getRole() != null && !user.getRole().isBlank()) {
			existing.setRole(user.getRole());
		}
		return userRepository.save(existing);
	}

	private void encodePasswordIfPlain(User user) {
		String p = user.getPassword();
		if (p != null && !p.isBlank() && !p.startsWith("$2a$") && !p.startsWith("$2b$") && !p.startsWith("$2y$")) {
			user.setPassword(passwordEncoder.encode(p));
		}
	}

	public void delete(Long id) {
		if (!userRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
		}
		userRepository.deleteById(id);
	}
}
