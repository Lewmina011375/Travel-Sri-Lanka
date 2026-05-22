package com.travel.travel_backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class VehicleImageStorageService {

	private static final Set<String> ALLOWED_TYPES = Set.of(
			"image/jpeg", "image/png", "image/webp", "image/gif");

	@Value("${app.upload.dir:uploads}")
	private String uploadDir;

	public String storeAndReturnWebPath(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File required");
		}
		String contentType = file.getContentType();
		if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPEG, PNG, WebP, or GIF allowed");
		}
		String ext = extensionForType(contentType, file.getOriginalFilename());
		String storedName = UUID.randomUUID().toString().replace("-", "") + ext;
		Path root = Paths.get(uploadDir).toAbsolutePath().normalize();
		Path vehiclesDir = root.resolve("vehicles");
		try {
			Files.createDirectories(vehiclesDir);
			Path target = vehiclesDir.resolve(storedName);
			try (InputStream in = file.getInputStream()) {
				Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
			}
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not store file");
		}
		return "/uploads/vehicles/" + storedName;
	}

	private static String extensionForType(String contentType, String originalName) {
		return switch (contentType.toLowerCase(Locale.ROOT)) {
			case "image/jpeg" -> ".jpg";
			case "image/gif" -> ".gif";
			case "image/png" -> ".png";
			case "image/webp" -> ".webp";
			default -> fallbackExtension(originalName);
		};
	}

	private static String fallbackExtension(String originalName) {
		if (originalName == null || !originalName.contains(".")) {
			return ".bin";
		}
		String ext = originalName.substring(originalName.lastIndexOf('.')).toLowerCase(Locale.ROOT);
		if (ext.length() > 8) {
			return ".bin";
		}
		return ext;
	}
}
