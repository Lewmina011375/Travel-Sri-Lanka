package com.travel.travel_backend.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.travel.travel_backend.model.Booking;
import com.travel.travel_backend.model.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUser(User user);

	@Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b")
	BigDecimal sumTotalPrice();
}
