package com.example.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long activityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false, length = 30)
    private ActivityType activityType = ActivityType.PLACE;

    @Column(name = "activity_name", nullable = false, length = 200)
    private String activityName;

    @Column(length = 255)
    private String address;

    @Column(name = "estimated_cost")
    private Double estimatedCost = 0.0;

    private Double rating = 4.5;

    @Column(name = "time_slot", length = 50)
    private String timeSlot;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public Activity() {
    }

    public Activity(Long activityId, Trip trip, Integer dayNumber, ActivityType activityType, String activityName, String address, Double estimatedCost, Double rating, String timeSlot, String notes) {
        this.activityId = activityId;
        this.trip = trip;
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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
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
