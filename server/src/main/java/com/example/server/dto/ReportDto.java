package com.example.server.dto;

import java.time.LocalDateTime;

public class ReportDto {

    private Long reportId;
    private Long tripId;
    private String destination;
    private Integer totalDays;
    private Double estimatedCost;
    private String summary;
    private LocalDateTime generatedAt;

    public ReportDto() {
    }

    public ReportDto(Long reportId, Long tripId, String destination, Integer totalDays, Double estimatedCost, String summary, LocalDateTime generatedAt) {
        this.reportId = reportId;
        this.tripId = tripId;
        this.destination = destination;
        this.totalDays = totalDays;
        this.estimatedCost = estimatedCost;
        this.summary = summary;
        this.generatedAt = generatedAt;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(Integer totalDays) {
        this.totalDays = totalDays;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}
