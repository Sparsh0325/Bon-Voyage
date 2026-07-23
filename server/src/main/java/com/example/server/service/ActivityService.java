package com.example.server.service;

import com.example.server.dto.ActivityDto;
import com.example.server.model.Activity;
import com.example.server.model.Trip;
import com.example.server.repository.ActivityRepository;
import com.example.server.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final TripRepository tripRepository;

    public ActivityService(ActivityRepository activityRepository, TripRepository tripRepository) {
        this.activityRepository = activityRepository;
        this.tripRepository = tripRepository;
    }

    @Transactional
    public ActivityDto addActivity(ActivityDto dto) {
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + dto.getTripId()));

        Activity activity = new Activity();
        activity.setTrip(trip);
        activity.setDayNumber(dto.getDayNumber() != null ? dto.getDayNumber() : 1);
        activity.setActivityType(dto.getActivityType());
        activity.setActivityName(dto.getActivityName());
        activity.setAddress(dto.getAddress());
        activity.setEstimatedCost(dto.getEstimatedCost() != null ? dto.getEstimatedCost() : 0.0);
        activity.setRating(dto.getRating() != null ? dto.getRating() : 4.5);
        activity.setTimeSlot(dto.getTimeSlot());
        activity.setNotes(dto.getNotes());

        Activity saved = activityRepository.save(activity);

        // Recalculate trip remaining budget
        recalculateTripBudget(trip.getTripId());

        return mapToDto(saved);
    }

    public List<ActivityDto> getActivitiesByTrip(Long tripId) {
        return activityRepository.findByTripTripId(tripId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ActivityDto> getActivitiesByTripAndDay(Long tripId, Integer dayNumber) {
        return activityRepository.findByTripTripIdAndDayNumber(tripId, dayNumber)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteActivity(Long activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found: " + activityId));
        Long tripId = activity.getTrip().getTripId();
        activityRepository.delete(activity);
        recalculateTripBudget(tripId);
    }

    @Transactional
    public void recalculateTripBudget(Long tripId) {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip == null) return;

        List<Activity> activities = activityRepository.findByTripTripId(tripId);
        double totalSpent = activities.stream()
                .mapToDouble(a -> a.getEstimatedCost() != null ? a.getEstimatedCost() : 0.0)
                .sum();

        double remaining = (trip.getTotalBudget() != null ? trip.getTotalBudget() : 0.0) - totalSpent;
        trip.setRemainingBudget(Math.max(0.0, remaining));
        tripRepository.save(trip);
    }

    private ActivityDto mapToDto(Activity activity) {
        return new ActivityDto(
                activity.getActivityId(),
                activity.getTrip().getTripId(),
                activity.getDayNumber(),
                activity.getActivityType(),
                activity.getActivityName(),
                activity.getAddress(),
                activity.getEstimatedCost(),
                activity.getRating(),
                activity.getTimeSlot(),
                activity.getNotes()
        );
    }
}
