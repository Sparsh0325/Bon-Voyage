package com.example.server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByTripTripId(Long tripId);
    List<Activity> findByTripTripIdAndDayNumber(Long tripId, Integer dayNumber);
    void deleteByTripTripId(Long tripId);
}
