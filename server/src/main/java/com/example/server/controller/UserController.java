package com.example.server.controller;

import com.example.server.dto.UserResponseDto;
import com.example.server.model.UserProfile;
import com.example.server.repository.UserProfileRepository;
import com.example.server.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserProfileRepository userProfileRepository;
    private final LoginService loginService;

    public UserController(UserProfileRepository userProfileRepository, LoginService loginService) {
        this.userProfileRepository = userProfileRepository;
        this.loginService = loginService;
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        return userProfileRepository.findById(userId)
                .map(p -> ResponseEntity.ok(loginService.mapToUserResponse(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody UserProfile updatedData) {
        return userProfileRepository.findById(userId)
                .map(profile -> {
                    if (updatedData.getFullName() != null) profile.setFullName(updatedData.getFullName());
                    if (updatedData.getPhone() != null) profile.setPhone(updatedData.getPhone());
                    if (updatedData.getProfileImage() != null) profile.setProfileImage(updatedData.getProfileImage());
                    UserProfile saved = userProfileRepository.save(profile);
                    return ResponseEntity.ok(loginService.mapToUserResponse(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
