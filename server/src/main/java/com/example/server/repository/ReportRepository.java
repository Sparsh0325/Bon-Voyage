package com.example.server.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByTripTripId(Long tripId);
}
