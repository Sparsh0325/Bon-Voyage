package com.example.server.controller;

import com.example.server.dto.ActivityDto;
import com.example.server.service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ActivityDto addActivity(@RequestBody ActivityDto dto) {
        return activityService.addActivity(dto);
    }

    @GetMapping("/trip/{tripId}")
    public List<ActivityDto> getActivitiesByTrip(@PathVariable Long tripId) {
        return activityService.getActivitiesByTrip(tripId);
    }

    @GetMapping("/trip/{tripId}/day/{dayNumber}")
    public List<ActivityDto> getActivitiesByTripAndDay(@PathVariable Long tripId, @PathVariable Integer dayNumber) {
        return activityService.getActivitiesByTripAndDay(tripId, dayNumber);
    }

    @DeleteMapping("/{activityId}")
    public String deleteActivity(@PathVariable Long activityId) {
        activityService.deleteActivity(activityId);
        return "Activity deleted and trip remaining budget recalculated.";
    }
}
