package com.example.server.dto;

import com.example.server.model.ActivityType;

public class ActivityDto {

    private Long activityId;
    private Long tripId;
    private Integer dayNumber;
    private ActivityType activityType;
    private String activityName;
    private String address;
    private Double estimatedCost;
    private Double rating;
    private String timeSlot;
    private String notes;

    public ActivityDto() {
    }

    public ActivityDto(Long activityId, Long tripId, Integer dayNumber, ActivityType activityType, String activityName, String address, Double estimatedCost, Double rating, String timeSlot, String notes) {
        this.activityId = activityId;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.activityType = activityType;
        this.activityName = activityName;
        this.address = address;
        this.estimatedCost = estimatedCost;
        this.rating = rating;
        this.timeSlot = timeSlot;
        this.notes = notes;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public Integer getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
