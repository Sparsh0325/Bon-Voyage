package com.example.server.controller;

import com.example.server.dto.ReportDto;
import com.example.server.model.Activity;
import com.example.server.model.Report;
import com.example.server.model.Trip;
import com.example.server.repository.ActivityRepository;
import com.example.server.repository.ReportRepository;
import com.example.server.repository.TripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/report")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportRepository reportRepository;
    private final TripRepository tripRepository;
    private final ActivityRepository activityRepository;

    public ReportController(ReportRepository reportRepository, TripRepository tripRepository, ActivityRepository activityRepository) {
        this.reportRepository = reportRepository;
        this.tripRepository = tripRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public ResponseEntity<?> getOrGenerateReport(@PathVariable Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found: " + tripId));

        Report report = reportRepository.findByTripTripId(tripId).orElseGet(() -> {
            List<Activity> activities = activityRepository.findByTripTripId(tripId);
            double totalSpent = activities.stream()
                    .mapToDouble(a -> a.getEstimatedCost() != null ? a.getEstimatedCost() : 0.0)
                    .sum();

            int totalDays = Math.max(1, activities.stream().mapToInt(a -> a.getDayNumber() != null ? a.getDayNumber() : 1).max().orElse(1));

            Report newReport = new Report();
            newReport.setTrip(trip);
            newReport.setTotalDays(totalDays);
            newReport.setEstimatedCost(totalSpent);
            newReport.setSummary(String.format("Trip Summary for %s: %d total days, %d scheduled activities, total estimated spent: ₹%.2f.", 
                    trip.getDestination(), totalDays, activities.size(), totalSpent));

            return reportRepository.save(newReport);
        });

        return ResponseEntity.ok(mapToDto(report));
    }

    private ReportDto mapToDto(Report report) {
        return new ReportDto(
                report.getReportId(),
                report.getTrip().getTripId(),
                report.getTrip().getDestination(),
                report.getTotalDays(),
                report.getEstimatedCost(),
                report.getSummary(),
                report.getGeneratedAt()
        );
    }
}
