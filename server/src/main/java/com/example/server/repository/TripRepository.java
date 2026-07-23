package com.example.server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserUserId(Long userId);
    List<Trip> findByUserLoginEmail(String email);
}