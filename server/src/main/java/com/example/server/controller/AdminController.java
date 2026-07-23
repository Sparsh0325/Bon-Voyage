package com.example.server.controller;

import com.example.server.dto.UserResponseDto;
import com.example.server.model.Login;
import com.example.server.model.Status;
import com.example.server.model.UserProfile;
import com.example.server.repository.ActivityRepository;
import com.example.server.repository.LoginRepository;
import com.example.server.repository.TripRepository;
import com.example.server.repository.UserProfileRepository;
import com.example.server.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserProfileRepository userProfileRepository;
    private final LoginRepository loginRepository;
    private final TripRepository tripRepository;
    private final ActivityRepository activityRepository;
    private final LoginService loginService;

    public AdminController(UserProfileRepository userProfileRepository, LoginRepository loginRepository, TripRepository tripRepository, ActivityRepository activityRepository, LoginService loginService) {
        this.userProfileRepository = userProfileRepository;
        this.loginRepository = loginRepository;
        this.tripRepository = tripRepository;
        this.activityRepository = activityRepository;
        this.loginService = loginService;
    }

    @GetMapping("/users")
    public List<UserResponseDto> getAllUsers() {
        return userProfileRepository.findAll()
                .stream()
                .map(loginService::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @PutMapping("/users/{loginId}/status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long loginId, @RequestParam String status) {
        Login login = loginRepository.findById(loginId)
                .orElseThrow(() -> new RuntimeException("Login user not found: " + loginId));

        login.setStatus("ACTIVE".equalsIgnoreCase(status) ? Status.ACTIVE : Status.INACTIVE);
        loginRepository.save(login);

        return ResponseEntity.ok("User status updated to: " + login.getStatus());
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userProfileRepository.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @GetMapping("/stats")
    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userProfileRepository.count());
        stats.put("totalTrips", tripRepository.count());
        stats.put("totalActivities", activityRepository.count());
        stats.put("activeLogins", loginRepository.findAll().stream().filter(l -> l.getStatus() == Status.ACTIVE).count());
        return stats;
    }
}
