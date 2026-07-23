package com.example.server.controller;

import com.example.server.dto.TripDto;
import com.example.server.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public TripDto createTrip(@RequestBody TripDto dto) {
        return tripService.createTrip(dto);
    }

    @GetMapping
    public List<TripDto> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/user/{userId}")
    public List<TripDto> getTripsByUser(@PathVariable Long userId) {
        return tripService.getTripsByUser(userId);
    }

    @GetMapping("/{tripId}")
    public TripDto getTripById(@PathVariable Long tripId) {
        return tripService.getTripById(tripId);
    }

    @DeleteMapping("/{tripId}")
    public String deleteTrip(@PathVariable Long tripId) {
        tripService.deleteTrip(tripId);
        return "Trip deleted successfully";
    }
}