package com.travel.travel_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.travel.travel_backend.model.User;
import com.travel.travel_backend.repository.UserRepository;

@Component
public class AdminUserInitializer implements ApplicationRunner {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Value("${app.admin.username:admin}")
	private String adminUsername;

	@Value("${app.admin.password:admin123}")
	private String adminPassword;

	/**
	 * When true (default), the configured admin password is re-applied on startup if it
	 * no longer matches {@link #adminPassword}. Fixes logins after DB was seeded with a
	 * different password or plaintext. Set to false in production if admins change
	 * credentials only through the app.
	 */
	@Value("${app.admin.sync-password:true}")
	private boolean syncPassword;

	public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(ApplicationArguments args) {
		String name = adminUsername != null ? adminUsername.trim() : "admin";
		String rawPassword = adminPassword != null && !adminPassword.isBlank() ? adminPassword : "admin123";
		String email = name + "@travellanka.admin";

		userRepository.findByUsername(name).ifPresentOrElse(existing -> {
			if (!syncPassword) {
				return;
			}
			String stored = existing.getPassword();
			if (stored != null && passwordEncoder.matches(rawPassword, stored)) {
				return;
			}
			existing.setPassword(passwordEncoder.encode(rawPassword));
			if (existing.getRole() == null || existing.getRole().isBlank() || "USER".equals(existing.getRole())) {
				existing.setRole("ADMIN");
			}
			userRepository.save(existing);
		}, () -> {
			User admin = new User();
			admin.setUsername(name);
			admin.setEmail(email);
			admin.setPassword(passwordEncoder.encode(rawPassword));
			admin.setFullName("Administrator");
			admin.setRole("ADMIN");
			userRepository.save(admin);
		});
	}
}
