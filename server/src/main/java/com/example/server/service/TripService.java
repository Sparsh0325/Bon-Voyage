package com.example.server.service;

import com.example.server.dto.TripDto;
import com.example.server.model.Trip;
import com.example.server.model.UserProfile;
import com.example.server.repository.TripRepository;
import com.example.server.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserProfileRepository userProfileRepository;
    private final ActivityService activityService;

    public TripService(TripRepository tripRepository, UserProfileRepository userProfileRepository, ActivityService activityService) {
        this.tripRepository = tripRepository;
        this.userProfileRepository = userProfileRepository;
        this.activityService = activityService;
    }

    @Transactional
    public TripDto createTrip(TripDto dto) {
        UserProfile user = userProfileRepository.findById(dto.getUserId())
                .orElseGet(() -> {
                    // Fallback to first user profile if provided ID not found
                    return userProfileRepository.findAll().stream().findFirst()
                            .orElseThrow(() -> new RuntimeException("No user profile exists. Please register first."));
                });

        Trip trip = new Trip();
        trip.setUser(user);
        trip.setDestination(dto.getDestination());
        trip.setStartDate(dto.getStartDate());
        trip.setEndDate(dto.getEndDate());
        trip.setTotalBudget(dto.getTotalBudget() != null ? dto.getTotalBudget() : 0.0);
        trip.setRemainingBudget(dto.getTotalBudget() != null ? dto.getTotalBudget() : 0.0);
        trip.setStatus(dto.getStatus() != null ? dto.getStatus() : "PLANNED");

        Trip saved = tripRepository.save(trip);
        return mapToDto(saved);
    }

    public List<TripDto> getTripsByUser(Long userId) {
        return tripRepository.findByUserUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TripDto getTripById(Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));
        TripDto dto = mapToDto(trip);
        dto.setActivities(activityService.getActivitiesByTrip(tripId));
        return dto;
    }

    public List<TripDto> getAllTrips() {
        return tripRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTrip(Long tripId) {
        tripRepository.deleteById(tripId);
    }

    private TripDto mapToDto(Trip trip) {
        return new TripDto(
                trip.getTripId(),
                trip.getUser() != null ? trip.getUser().getUserId() : null,
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getTotalBudget(),
                trip.getRemainingBudget(),
                trip.getStatus()
        );
    }
}